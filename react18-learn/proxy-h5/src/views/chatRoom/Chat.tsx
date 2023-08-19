import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import {
  Input,
  Image,
  ImageViewer,
  Dialog,
  Mask,
  DotLoading,
} from "antd-mobile";
import { List, Card } from "react-vant";
import { Arrow } from "@react-vant/icons";
import { PicturesOutline } from "antd-mobile-icons";
import styles from "./Chat.module.scss";
import { uploadFastImg } from "./../../api/index";
import useWebSocket from "./../../hooks/useWebSockets";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";

const Chat = () => {
  const [ws, wsData] = useWebSocket("ws://172.28.113.248:10086/webSocket", {});
  const [value, setValue] = useState("");
  const [messageList, setMessageList] = useState<any[]>([]);
  const [finished, setFinished] = useState<boolean>(true);
  const [imgPreVisiable, setImgPreVisiable] = useState(false);
  const [insertMsgType, setInsertMsgType] = useState(0); //0 :文字 1:图片
  const [visibleMask, setVisibleMask] = useState(false);
  const listEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const [fastImgUrl, setFastImgUrl] = useState("");
  let msgImgUrl = "";

  /**
   *type : 1: 客服消息 2:用户消息 3:官方欢迎消息 4:充值方式消息 5:充值链接类型
   */
  const onLoad = async () => {
    // const data = await getData()
    // setMessageList([
    //   {
    //     id: 3,
    //     icon: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
    //     content:
    //         "欢迎使用官方代理充值,请按照提示操作充值请按照提示操作充值请按照提示操作充值请按照提示操作充值请按照提示操作充值请按照提示操作充值!",
    //       msgType: 0, //0: 代表文字消息， 1: 代表图片
    //     type: 3,
    //     time: new Date().getTime(),
    //   },
    //   {
    //     id: 4,
    //     icon: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
    //     content: "当前代理支持的充值方式",
    //     msgType: 0, //0: 代表文字消息， 1: 代表图片
    //     msgList: [
    //       {
    //         paytype: "支付宝",
    //         icon: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
    //         link: "https://www.baidu.com",
    //       },
    //       {
    //         paytype: "微信",
    //         icon: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
    //         link: "https://www.baidu.com",
    //       },
    //     ],
    //     type: 4,
    //     time: new Date().getTime(),
    //   },
    //   {
    //     id: 5,
    //     icon: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
    //     content: "支付宝充值: ¥10000.00",
    //     msgType: 0,
    //     link: "https://www.baidu.com",
    //     type: 5,
    //     time: new Date().getTime(),
    //   },
    //   {
    //     id: 1,
    //     icon: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
    //     content:
    //         "我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员我是客服人员",
    //     msgType: 0,
    //     type: 1,
    //     time: new Date().getTime(),
    //   },
    //   {
    //     id: 6,
    //     icon: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
    //     content:
    //         "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
    //       msgType: 1,
    //     type: 1,
    //     time: new Date().getTime(),
    //   },
    //   {
    //     id: 2,
    //     icon: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
    //     content:
    //         "我是用户我是用户我是用户我是用户我是用户我是用户我是用户我是用户我是用户我是用户我是用户我是用户我是用户我是用户我是用户我是用户我是用户我是用户我是用户",
    //       msgType: 0,
    //     type: 2,
    //     time: new Date().getTime(),
    //   },
    //   {
    //     id: 7,
    //     icon: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
    //     content:
    //         "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
    //       msgType: 1,
    //     type: 2,
    //     time: new Date().getTime(),
    //   },
    // ]);
    // setMessageList([
    //   {
    //         "fromUserId": "jt_1102312",
    //         "fromUserName": "张三",
    //         "toUserName": "李四",
    //         "toUserId": "agent_1000",
    //         "icon": "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
    //         "content": value,
    //         "msgType": 0,
    //         "type": 2,
    //         "time": new Date().getTime(),
    //         "oredrNumber": '0000',
    //         "orderAmount": 100,
    //         "orderType": 1,
    //         "isCreate": false,
    //         "chatIndex":0,
    //         "msgId": uuidv4()
    //   }
    // ])
    // if (messageList.length) {
    //   setFinished(true);
    // } else {
    //   setFinished(false);
    // }
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
    console.log(item);
  };

  //点击充值链接处理事件
  const handleRecharLinkClick = (amount: any) => {
    navigate(`/recharge/recharge/${amount}`);
  };

  //上传图片
  const uploadMessageImg = () => {
    let imgFormData = null;
    if (inputRef && inputRef.current && ws) {
      inputRef.current.addEventListener("change", function (event: any) {
        let $file = event.currentTarget;
        let file: any = $file?.files;
        let URL: string | null = null;
        if ((window as any).createObjectURL != undefined) {
          URL = (window as any).createObjectURL(file[0]);
        } else if (window.URL != undefined) {
          URL = window.URL.createObjectURL(file[0]);
        } else if (window.webkitURL != undefined) {
          URL = window.webkitURL.createObjectURL(file[0]);
        }
        imgFormData = new FormData();
        (imgFormData as any).append("file", (file as any)[0]);
        imgFormData.append("fileSize", file[0].size);
        // imgFormData.append('file', element.file)
        // 获取上传图片的本地URL，用于上传前的本地预览
        uploadFastImg(imgFormData).then((res: any) => {
          if (res && res.code && res.code === 200) {
            setFastImgUrl(res.data.fastUrl + res.data.fastPath);
            msgImgUrl = res.data.fastUrl + res.data.fastPath;
            if (URL) {
              Dialog.show({
                image: URL,
                content: "",
                closeOnAction: true,
                actions: [
                  [
                    {
                      key: "cancel",
                      text: "取消",
                      onClick: () => {
                        console.log("取消发送图片");
                      },
                    },
                    {
                      key: "confirm",
                      text: "发送",
                      // bold: true,
                      danger: true,
                      style: { color: "#1677ff" },
                      onClick: () => {
                        //在这里将图片发送塞到websocket中
                        console.log("确认发送图片");
                        setInsertMsgType(1);
                        handleSendMessage(1);
                      },
                    },
                  ],
                ],
              });
            }
          }
        });
      });
    }
  };

  //发送消息
  const handleSendMessage = (msgType: any) => {
    console.log(ws);
    console.log(fastImgUrl);
    let temp = [...messageList];
    let insertMsg = {
      fromUserId: "jt_1102312",
      fromUserName: "张三",
      toUserName: "李四",
      toUserId: "agent_1000",
      icon: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
      content: msgType === 0 ? value : msgImgUrl,
      msgType: msgType,
      type: 2,
      time: new Date().getTime(),
      oredrNumber: "0000",
      orderAmount: 100,
      orderType: 1,
      createOrder: 0,
      msgId: uuidv4(),
    };
    ws.send(
      JSON.stringify({
        handType: "3",
        message: insertMsg,
      })
    );
    temp.push(insertMsg);
    console.log(temp);
    msgImgUrl = "";
    setMessageList(temp);
    setValue("");
    setInsertMsgType(0);
  };

  //页面初始化
  useEffect(() => {
    onLoad();
    uploadMessageImg();
  }, []);

  //监听聊天记录，触发滚动到底部操作
  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  //监听收到的消息
  useEffect(() => {
    setMessageList([...messageList, wsData]);
  }, [wsData]);

  return (
    <div className={styles.chat_container}>
      <div className={styles.message_content}>
        <List finished={finished} onLoad={onLoad}>
          {messageList.map((_, i) => {
            switch (_.type) {
              case 1:
                return (
                  <div className={styles.customer_message} key={_.msgId}>
                    {/* 客服人员消息放在左边，同时要区分文字消息和图片消息 */}
                    <div className={styles.message_avator}>
                      <Image
                        src={_.icon}
                        width={"100%"}
                        height={"100%"}
                        style={{ borderRadius: "50%" }}
                      />
                    </div>
                    {_.msgType === 0 ? (
                      <div className={styles.cusTextMessage}>
                        {_.content}
                        <span className={styles.cusTextMessage_right_time}>
                          {dayjs(_.time).format("YYYY-MM-DD HH:mm:ss")}
                        </span>
                      </div>
                    ) : (
                      <div
                        className={styles.cusImgMessage}
                        onClick={() => setImgPreVisiable(true)}
                      >
                        <Image src={_.content} width={"100%"} height={"80%"} />
                        <span className={styles.cusImgMessage_right_time}>
                        {dayjs(_.time).format("YYYY-MM-DD HH:mm:ss")}
                        </span>
                        <ImageViewer
                          image={_.content}
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
                  <div className={styles.user_message} key={_.msgId}>
                    {/* 客服人员消息放在右边，同时要区分文字消息和图片消息 */}
                    {_.msgType === 0 ? (
                      <div className={styles.userTextMessage}>
                        {_.content}
                        <span className={styles.userTextMessage_right_time}>
                        {dayjs(_.time).format("YYYY-MM-DD HH:mm:ss")}
                        </span>
                      </div>
                    ) : (
                      <div
                        className={styles.userImgMessage}
                        onClick={() => setImgPreVisiable(true)}
                      >
                        <Image src={_.content} width={"100%"} height={"80%"} />
                        <span className={styles.userImgMessage_right_time}>
                        {dayjs(_.time).format("YYYY-MM-DD HH:mm:ss")}
                        </span>
                        <ImageViewer
                          image={_.content}
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
                  <div className={styles.common_message} key={_.msgId}>
                    {/* 官方欢迎消息 */}
                    <div className="message_in">{_.message.content}</div>
                    <span className={styles.common_message_right_time}>
                      2023-08-10
                    </span>
                  </div>
                );
                break;
              case 4:
                return (
                  <div className={styles.rechartype_message} key={_.msgId}>
                    <div className={styles.rechartype_title}>
                      待支付金额: <span>1000.00</span>
                    </div>
                    <div className={styles.rechartype_label}>
                      请点击选择您的充值方式
                    </div>
                    <div className={styles.rechartype_list}>
                      <div
                        className={styles.type_item}
                        onClick={() => handleRechargeTypeClick({})}
                      >
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
                    {dayjs(_.time).format("YYYY-MM-DD HH:mm:ss")}
                    </span>
                  </div>
                );
                break;
              case 5:
                return (
                  <div
                    className={styles.recharlink_message}
                    key={_.msgId}
                    onClick={() => handleRecharLinkClick(1000)}
                  >
                    {/* 消息类型5:充值链接类型 {_.content} */}
                    <Card round>
                      <Card.Header extra={<Arrow />}>
                        支付宝充值：¥1000.00
                      </Card.Header>
                      <Card.Body>
                        <div className={styles.recharge_link}>
                          <span className={styles.linkNow}>点击立即充值</span>
                          <span className={styles.link_right_time}>
                          {dayjs(_.time).format("YYYY-MM-DD HH:mm:ss")}
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
          <input
            type="file"
            accept="image/*"
            name="uploader-input"
            className={styles.uploader_file}
            ref={inputRef}
          ></input>
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
        <div
          className={styles.messageSend}
          onClick={() => handleSendMessage(0)}
        >
          发送
        </div>
      </div>
      {/* 上传图片的预览弹框 */}

      {/* 上传图片的预览弹框 */}
      {/* <Mask
        visible={visibleMask}
        onMaskClick={() => {}}
        opacity="thin"
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <DotLoading color="primary" style={{ fontSize: "30px" }} />
      </Mask> */}
    </div>
  );
};

export default Chat;
