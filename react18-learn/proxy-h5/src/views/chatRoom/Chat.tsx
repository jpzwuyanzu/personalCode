import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import { Input, Image, ImageViewer } from "antd-mobile";
import { List, Card} from "react-vant";
import { Arrow, Like } from '@react-vant/icons'
import { PicturesOutline, AntOutline, RightOutline } from "antd-mobile-icons";
import styles from "./Chat.module.scss";

const Chat = () => {
  const [value, setValue] = useState("");
  const [messageList, setMessageList] = useState<any[]>([]);
  const [finished, setFinished] = useState<boolean>(false);
  const [imgPreVisiable, setImgPreVisiable] = useState(false);
  const listEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  /**
   *type : 1: 客服消息 2:用户消息 3:官方欢迎消息 4:充值方式消息 5:充值链接类型
   */
  const onLoad = async () => {
    // const data = await getData()
    setMessageList([
      {
        id: 3,
        icon: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
        msg: {
          content:
            "欢迎使用官方代理充值,请按照提示操作充值请按照提示操作充值请按照提示操作充值请按照提示操作充值请按照提示操作充值请按照提示操作充值!",
          msgT: 0, //0: 代表文字消息， 1: 代表图片
        },
        type: 3,
        time: new Date().getTime(),
      },
      {
        id: 4,
        icon: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
        msg: {
          content: "当前代理支持的充值方式",
          msgT: 0, //0: 代表文字消息， 1: 代表图片
        },
        msgList: [
          {
            paytype: "支付宝",
            icon: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
            link: "https://www.baidu.com",
          },
          {
            paytype: "微信",
            icon: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
            link: "https://www.baidu.com",
          },
        ],
        type: 4,
        time: new Date().getTime(),
      },
      {
        id: 5,
        icon: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
        msg: {
          content: "支付宝充值: ¥10000.00",
          msgT: 0,
        },
        link: "https://www.baidu.com",
        type: 5,
        time: new Date().getTime(),
      },
      {
        id: 1,
        icon: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
        msg: {
          content:
            "我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员",
          msgT: 0,
        },
        type: 1,
        time: new Date().getTime(),
      },
      {
        id: 6,
        icon: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
        msg: {
          content:
            "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
          msgT: 1,
        },
        type: 1,
        time: new Date().getTime(),
      },
      {
        id: 2,
        icon: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
        msg: {
          content:
            "我是用户我是用户我是用户我是用户我是用户我是用户我是用户我是用户我是用户我是用户我是用户我是用户我是用户我是用户我是用户我是用户我是用户我是用户我是用户",
          msgT: 0,
        },
        type: 2,
        time: new Date().getTime(),
      },
      {
        id: 7,
        icon: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
        msg: {
          content:
            "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
          msgT: 1,
        },
        type: 2,
        time: new Date().getTime(),
      },
    ]);
    if (messageList.length) {
      setFinished(true);
    }
  };
  //聊天记录滚动到底部
  const scrollToBottom = () => {
    if (listEndRef && listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  //card点击事件
  const onBodyClick = () => {};
  const onHeaderClick = () => {};

  //点击充值方式事件处理
  const handleRechargeTypeClick = (item: any) => {
    console.log(item)
  }

  //点击充值链接处理事件
  const handleRecharLinkClick = (amount: any) => {
    navigate(`/recharge/recharge/${amount}`)
  }

  //监听聊天记录，出发滚动到底部操作
  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  //页面初始化
  useEffect(() => {
    onLoad();
  }, []);

  return (
    <div className={styles.chat_container}>
      <div className={styles.message_content}>
        <List finished={finished} onLoad={onLoad}>
          {messageList.map((_, i) => {
            switch (_.type) {
              case 1:
                return (
                  <div className={styles.customer_message} key={_.id}>
                    {/* 客服人员消息放在左边，同时要区分文字消息和图片消息 */}
                    <div className={styles.message_avator}>
                      <Image
                        src={_.icon}
                        width={"100%"}
                        height={"100%"}
                        style={{ borderRadius: "50%" }}
                      />
                    </div>
                    {_.msg.msgT === 0 ? (
                      <div className={styles.cusTextMessage}>
                        {_.msg.content}
                        <span className={styles.cusTextMessage_right_time}>
                          2023-08-10
                        </span>
                      </div>
                    ) : (
                      <div
                        className={styles.cusImgMessage}
                        onClick={() => setImgPreVisiable(true)}
                      >
                        <Image
                          src={_.msg.content}
                          width={"100%"}
                          height={"80%"}
                        />
                        <span className={styles.cusImgMessage_right_time}>
                          2023-08-10
                        </span>
                        <ImageViewer
                          image={_.msg.content}
                          visible={imgPreVisiable}
                          onClose={() => {
                            setImgPreVisiable(false);
                          }}
                        />
                      </div>
                    )}
                  </div>
                );
                break;
              case 2:
                return (
                  <div className={styles.user_message} key={_.id}>
                    {/* 客服人员消息放在右边，同时要区分文字消息和图片消息 */}
                    {_.msg.msgT === 0 ? (
                      <div className={styles.userTextMessage}>
                        {_.msg.content}
                        <span className={styles.userTextMessage_right_time}>
                          2023-08-10
                        </span>
                      </div>
                    ) : (
                      <div
                        className={styles.userImgMessage}
                        onClick={() => setImgPreVisiable(true)}
                      >
                        <Image
                          src={_.msg.content}
                          width={"100%"}
                          height={"80%"}
                        />
                        <span className={styles.userImgMessage_right_time}>
                          2023-08-10
                        </span>
                        <ImageViewer
                          image={_.msg.content}
                          visible={imgPreVisiable}
                          onClose={() => {
                            setImgPreVisiable(false);
                          }}
                        />
                      </div>
                    )}
                    <div className={styles.message_avator}>
                      <Image
                        src={_.icon}
                        width={"100%"}
                        height={"100%"}
                        style={{ borderRadius: "50%" }}
                      />
                    </div>
                  </div>
                );
                break;
              case 3:
                return (
                  <div className={styles.common_message} key={_.id}>
                    {/* 官方欢迎消息 */}
                    <div className="message_in">{_.msg.content}</div>
                    <span className={styles.common_message_right_time}>
                      2023-08-10
                    </span>
                  </div>
                );
                break;
              case 4:
                return (
                  <div className={styles.rechartype_message} key={_.id}>
                    <div className={styles.rechartype_title}>
                      待支付金额: <span>1000.00</span>
                    </div>
                    <div className={styles.rechartype_label}>
                      请点击选择您的充值方式
                    </div>
                    <div className={styles.rechartype_list}>
                      <div className={styles.type_item} onClick={() => handleRechargeTypeClick({})}>
                        <Image
                          src={
                            "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60"
                          }
                          width={50}
                          height={50}
                          fit="fill"
                          style={{ borderRadius: "10%" }}
                        />
                        <div className={styles.type_name}>微信</div>
                      </div>
                      <div className={styles.type_item}>
                        <Image
                          src={
                            "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60"
                          }
                          width={50}
                          height={50}
                          fit="fill"
                          style={{ borderRadius: "10%" }}
                        />
                        <div className={styles.type_name}>微信</div>
                      </div>
                      <div className={styles.type_item}>
                        <Image
                          src={
                            "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60"
                          }
                          width={50}
                          height={50}
                          fit="fill"
                          style={{ borderRadius: "10%" }}
                        />
                        <div className={styles.type_name}>微信</div>
                      </div>
                      <div className={styles.type_item}>
                        <Image
                          src={
                            "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60"
                          }
                          width={50}
                          height={50}
                          fit="fill"
                          style={{ borderRadius: "10%" }}
                        />
                        <div className={styles.type_name}>微信</div>
                      </div>
                      <div className={styles.type_item}>
                        <Image
                          src={
                            "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60"
                          }
                          width={50}
                          height={50}
                          fit="fill"
                          style={{ borderRadius: "10%" }}
                        />
                        <div className={styles.type_name}>微信</div>
                      </div>
                    </div>
                    <span className={styles.rechartype_right_time}>
                          2023-08-10
                        </span>
                  </div>
                );
                break;
              case 5:
                return (
                  <div className={styles.recharlink_message} key={_.id} onClick={() => handleRecharLinkClick(1000)}>
                    {/* 消息类型5:充值链接类型 {_.content} */}
                    <Card round>
                    <Card.Header extra={<Arrow />}>支付宝充值：¥1000.00</Card.Header>
                    <Card.Body>
                     <div className={ styles.recharge_link }>
                      <span className={ styles.linkNow }>点击立即充值</span>
                      <span className={styles.link_right_time}>
                          2023-08-10
                        </span>
                     </div>
                    </Card.Body>
                  </Card>
                  </div>
                );
                break;
              default:
                break;
            }
          })}
        </List>
        <div style={{ float: "left", clear: "both" }} ref={listEndRef}></div>
      </div>
      <div className={styles.message_bottom}>
        <div className={styles.uploadImg}>
          <PicturesOutline />
        </div>
        <div className={styles.message_input}>
          <Input
            placeholder="请输入你想说的"
            className={styles.cusInput}
            value={value}
            onChange={(val) => {
              setValue(val);
            }}
          />
        </div>
        <div className={styles.messageSend}>发送</div>
      </div>
    </div>
  );
};

export default Chat;
