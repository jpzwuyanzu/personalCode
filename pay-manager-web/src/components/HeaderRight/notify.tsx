import { MutableRefObject, useEffect, useMemo, useRef, useState } from 'react';
import { useModel } from 'umi';
import { Badge, Button, Drawer, Form, Radio, notification } from 'antd';
import { BellOutlined } from '@ant-design/icons';
import { Client } from '@stomp/stompjs';
import rechargeAudio from '@/assets/recharge.mp3';
import withdrawAudio from '@/assets/withdraw.mp3';
import _ from 'lodash';
import './index.less';
import dayjs from 'dayjs';
import utils from '@/utils';
import { history } from 'umi';

enum MessageType {
  Recharge = 1,
  Withdraw = 2,
}

type Message = {
  id: string | number;
  eventType: number;
  orderNo: string;
  type: MessageType;
  merchantId: number;
  isRead: boolean;
  createdTime: string;
};

type SocketMsg = {
  backType: number;
  eventType: number;
  message: any;
};

const messageTypeAudioMap = {
  [MessageType.Recharge]: rechargeAudio,
  [MessageType.Withdraw]: withdrawAudio,
};

export default () => {
  const [api, contextHolder] = notification.useNotification();
  const { userInfo } = useModel('user');

  const notifyConfig = utils.localStorage.get('notify-config') || {
    notifyEnabled: 1,
    messages: [],
  };

  const socketClient: any | Client = useRef();

  const [isOpen, setIsOpen] = useState(false);
  const isOpenRef = useRef(isOpen);
  const [messages, setMessages] = useState<any>(notifyConfig.messages);
  const [notifyEnabled, setNotifyEnabled] = useState(
    notifyConfig.notifyEnabled,
  );
  const [unreadMsgCount, setUnreadMsgCount] = useState(0);

  // 保存配置和消息
  useEffect(() => {
    utils.localStorage.set('notify-config', {
      notifyEnabled,
      messages,
    });
  }, [notifyEnabled, messages]);

  useEffect(() => {
    setUnreadMsgCount(messages.filter((msg: Message) => !msg.isRead).length);
  }, [messages]);

  useEffect(() => {
    isOpenRef.current = isOpen;
  }, [isOpen]);

  const playAudio = (type: MessageType) => {
    const audio = messageTypeAudioMap[type];
    const audioDom = new Audio(audio);
    audioDom.play();
  };

  const openNotifyAlert = (message: string, description: string) => {
    if (isOpenRef.current) return;
    const key = utils.uuid();
    api.open({
      key,
      type: 'info',
      message,
      description,
      duration: 1500,
      onClick: () => {
        setIsOpen(true);
        api.destroy(key);
      },
    });
  };

  const stopListenSocket = () => {
    if (socketClient?.current) {
      socketClient?.current?.deactivate({ force: true });
      // socketClient?.current?.forceDisconnect();
    }
  };

  const startListenSocket = () => {
    if (!userInfo.token) return;
    const scheme = location.protocol === 'https:' ? 'wss' : 'ws';
    const url = `${scheme}://${location.host}/api/back-websocket/websocket?token=${userInfo.token}`;
    if (!socketClient?.current) {
      socketClient.current = new Client({
        brokerURL: url,
        heartbeatOutgoing: 15000,
        heartbeatIncoming: 15000,
        onConnect: () => {
          console.log('连接成功');
          // randomGenMsg();
          socketClient.current.subscribe('/topic/backstage', (data: any) => {
            const socketMsg: any = JSON.parse(data.body);
            socketMsg.message = JSON.parse(socketMsg.message);
            console.log(`收到消息: `, socketMsg);

            // 查询重复订单
            const isRepeat = messages.some((msg: Message) => {
              return msg.orderNo === socketMsg.message.orderNo;
            });

            if (isRepeat) return;

            const message: Message = {
              id: utils.uuid(),
              eventType: socketMsg.eventType,
              ...socketMsg.message,
              createdTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
              isRead: false,
            };

            // 只保留最新的50条消息
            const maxCount = 50;
            setMessages((messages: Message[]) => {
              return [message, ...messages].slice(0, maxCount);
            });

            const typeName =
              message.type === MessageType.Recharge ? '充值' : '提现';
            openNotifyAlert(
              `${typeName}订单提醒`,
              `${message.orderNo} - 商户有新的${typeName}订单`,
            );

            playAudio(message.type);
          });
        },
        onDisconnect: () => {
          console.log('断开连接');
        },
        onStompError: (frame) => {
          console.log('Broker reported error: ' + frame.headers['message']);
          console.log('Additional details: ' + frame.body);
        },
      });
    }
    socketClient?.current?.activate();
  };

  // useEffect(() => {
  //   if (userInfo?.token) {
  //     if (notifyEnabled === 1) {
  //       startListenSocket();
  //     }
  //   }
  // }, [userInfo]);

  useEffect(() => {
    if (notifyEnabled === 0) {
      stopListenSocket();
    } else {
      startListenSocket();
    }
  }, [notifyEnabled]);

  useEffect(() => {
    startListenSocket();
  }, [userInfo]);

  return (
    <div className="header-notify">
      {contextHolder}
      <Badge count={unreadMsgCount}>
        <Button onClick={() => setIsOpen(true)} icon={<BellOutlined />} />
      </Badge>
      <Drawer
        title={`消息提醒(${messages.length})`}
        placement="right"
        onClose={() => setIsOpen(false)}
        open={isOpen}
        className="notify-drawer"
      >
        <div className="notify-config">
          <div className="config">
            <div className="label">提醒接收</div>
            <Radio.Group
              value={notifyEnabled}
              onChange={(e) => setNotifyEnabled(e.target.value)}
              options={[
                { label: '开启', value: 1 },
                { label: '关闭', value: 0 },
              ]}
            />
          </div>
          {unreadMsgCount > 0 && (
            <a
              onClick={() => {
                const newMessages = [...messages];
                newMessages.forEach((msg: Message) => {
                  msg.isRead = true;
                });
                setMessages(newMessages);
              }}
            >
              全部已读
            </a>
          )}
        </div>
        {!messages.length ? (
          <div className="empty">暂无消息</div>
        ) : (
          <div className="list">
            {messages.map((msg: Message, index: number) => {
              const typeName =
                msg.type === MessageType.Recharge ? '充值' : '提现';
              return (
                <div
                  className={`item ${msg.isRead ? 'read' : 'no-read'}`}
                  key={msg.orderNo}
                  onClick={() => {
                    const newMessages = [...messages];
                    newMessages[index].isRead = true;
                    setMessages(newMessages);
                  }}
                >
                  {/*<div className="no">{messages.length - index}</div>*/}
                  <div className="meta">
                    <div className="time">{msg.createdTime}</div>
                    <div className={`status ${msg.isRead ? '' : 'no-read'}`}>
                      {msg.isRead ? '已读' : '未读'}
                    </div>
                  </div>
                  <div className="content">
                    <span
                      className="id"
                      onClick={() => {
                        if (msg.type === MessageType.Recharge) {
                          history.replace(
                            `/finance/usdt-recharge?orderNumber=${msg.orderNo}`,
                          );
                        } else if (msg.type === MessageType.Withdraw) {
                          history.replace(
                            `/finance/withdraw-approval?orderNumber=${msg.orderNo}`,
                          );
                        }
                      }}
                    >
                      {msg.orderNo}
                    </span>
                    <span className="split">-</span>
                    <span>商户有新的</span>
                    <span className="type">{typeName}</span>
                    <span>订单</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </Drawer>
    </div>
  );
};
