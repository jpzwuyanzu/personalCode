/* eslint-disable */
import React, { useEffect, useState, useRef, memo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Input,
  Image,
  ImageViewer,
  Dialog,
  Toast,
  DotLoading,
  Mask
} from "antd-mobile";
import { List, Card, ActionSheet } from "react-vant";
import { Arrow } from "@react-vant/icons";
import { PicturesOutline } from "antd-mobile-icons";
import styles from "./Chat.module.scss";
import { uploadFastImg } from "./../../api/index";
import useWebSocket from "./../../hooks/useWebSockets";
import RechargeCom from './../Recharge/Recharge'
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import { getStorage, setStorage } from "./../../utils/common";
import wxPay from "./../../assets/payType/WX_PAY.png";
import aliPay from "./../../assets/payType/ALI_PAY.png";
import unionPay from "./../../assets/payType/UNION_PAY.png";

const regTypesList: any = {
  UNION_PAY: 2,
  WX_PAY: 1,
  ALI_PAY: 0,
};

const wssUrl = (process.env as any).REACT_APP_WSS_HOST

//图片资源桶地址
const ossImgUrl = (process.env as any).REACT_APP_OSS_HOST;
let checkPayType:any = {};
const Chat = memo(() => {
  // const [ws, wsData] = useWebSocket("ws://172.28.113.248:10086/webSocket", {}); //本地
  const [ws, wsData] = useWebSocket(wssUrl , {}); //测试环境
  const [value, setValue] = useState("");
  const [actionSheetVisible, setActionSheetVisible] = useState(false)
  const navigate = useNavigate();
  const [messageList, setMessageList] = useState<any[]>([]);
  const [finished, setFinished] = useState<boolean>(true);
  const [imgPreVisiable, setImgPreVisiable] = useState(false); //用户消息图片预览
  const [imgPreVisiable1, setImgPreVisiable1] = useState(false); //客服消息图片预览
  const [visibleMask, setVisibleMask] = useState(false);
  const listEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const [fastImgUrl, setFastImgUrl] = useState("");
  const { pathname, search } = useLocation();
  const searchParams = new URLSearchParams(search);
  let msgImgUrl = "";
  

  /**
   *type : 1: 客服消息 2:用户消息 3:官方欢迎消息 4:充值方式消息 5:充值链接类型
   */
  const onLoad = async () => {};

  //聊天记录滚动到底部
  const scrollToBottom = () => {
    if (listEndRef && listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  };

  //点击充值方式事件处理
  const handleRechargeTypeClick = (item: any) => {
    checkPayType = {}
    //jumpType 1:非外跳 2:外跳
    if (item.jumpType == 2) {
      //跳转外部
      window.open(item.payImage, "_blank");
    } else {
      
      checkPayType = item
      setActionSheetVisible(true)
      
      // navigate(
      //   `/recharge/recharge?amount=${Number(
      //     searchParams.get("orderAmount")
      //   )}&reTypeP=${regTypesList[item.payCode]}&accTypeP=${
      //     item.payImage ? 0 : 1
      //   }&reNameP=${item.bankAccount}&reAccountP=${item.bankNo}&reBankNameP=${
      //     item.bankName
      //   }`
      // );
    }
  };

  //点击充值链接处理事件
  const handleRecharLinkClick = (amount: any) => {
    navigate(`/recharge/recharge/${amount}`);
  };

  //上传图片
  const uploadMessageImg = () => {
    let imgFormData = null;
    if (inputRef && inputRef.current) {
      inputRef.current.addEventListener("change", function (event: any) {
        let $file = event.currentTarget;
        let file: any = $file?.files;
        if(Number(file.size) > 10240) {
          Toast.show({ content: '图片最大上传10M', position: 'top' })
          return
        }
        setVisibleMask(true)
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
            setFastImgUrl(res.data.fastPath);
            setVisibleMask(false)
            msgImgUrl = res.data.fastPath;
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
    let temp = getStorage("session", searchParams.get("orderNumber"))
      ? JSON.parse(getStorage("session", searchParams.get("orderNumber")))
      : [];
    setVisibleMask(false)
    let insertMsg = {
      fromUserId: searchParams.get("fromUserId"),
      fromUserName: searchParams.get("fromUserName"),
      toUserName: searchParams.get("toUserName"),
      toUserId: searchParams.get("toUserId"),
      icon: `agent/20230831/ff151b8e0d0143a28af70413afce72cd.abc`,
      content: msgType === 0 ? value : msgImgUrl,
      msgType: msgType,
      type: 2,
      time: new Date().getTime(),
      orderNumber: searchParams.get("orderNumber"),
      orderAmount: searchParams.get("orderAmount"),
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
    msgImgUrl = "";
    setStorage("session", searchParams.get("orderNumber"), temp);
    setMessageList(temp);
    setValue("");
  };

  //发送消息校验
  const judgeMessage = () => {
    if(value) {
      handleSendMessage(0)
    } else {
      Toast.show({ content: '请输入消息内容', position: 'top' })
    }
  }


  //监听聊天记录，触发滚动到底部操作
  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  //监听收到的消息
  useEffect(() => {
    if (wsData && wsData.msgId && wsData.type) {
      setStorage("session", searchParams.get("orderNumber"), [
        ...messageList,
        wsData,
      ]);
      setMessageList([...messageList, wsData]);
    } else if (wsData && wsData.code === 1 && (wsData as any).list.length) {
      let temlist = wsData.list;
      // temlist.forEach((itm:any, inx: any) => {
      //   if(itm.type === 4) {
      //     itm.content = itm.content.split('.com/')[1]
      //   }
      // })  
      let temp = getStorage("session", searchParams.get("orderNumber"))
      ? JSON.parse(getStorage("session", searchParams.get("orderNumber")))
      : [];
      if(temp) {
        // setStorage("session", searchParams.get("orderNumber"),[...temp, ...wsData.list]);
        setStorage("session", searchParams.get("orderNumber"),[...temp, ...temlist]);
      }  else {
        // setStorage("session", searchParams.get("orderNumber"),[...wsData.list]);
        setStorage("session", searchParams.get("orderNumber"),[...temlist]);
      }
      // setMessageList([...temp, ...wsData.list]);
      setMessageList([...temp, ...temlist]);
    }
  }, [wsData]);

  //页面初始化
  useEffect(() => {
    if (ws) {
      uploadMessageImg();
    }
  }, [ws]);

  useEffect(() => {
    onLoad();
    return () => {
      ws && ws.close();
    };
  }, []);

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
                        src={
                          _.icon.indexOf("http") !== -1
                            ? _.icon
                            : ossImgUrl + _.icon
                        }
                        width={"100%"}
                        height={"100%"}
                        style={{ borderRadius: "50%" }}
                      />
                    </div>
                    {_.msgType === 0 ? (
                      <div className={styles.cusTextMessage}>
                        {_.content}
                        <span className={styles.cusTextMessage_right_time}>
                          {dayjs(_.time).format("MM-DD HH:mm:ss")}
                        </span>
                      </div>
                    ) : (
                      <div
                        className={styles.cusImgMessage}
                        onClick={() => setImgPreVisiable(true)}
                      >
                        <Image src={_.content} width={"100%"} height={"80%"} />
                        <span className={styles.cusImgMessage_right_time}>
                          {dayjs(_.time).format("MM-DD HH:mm:ss")}
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
                          {dayjs(_.time).format("MM-DD HH:mm:ss")}
                        </span>
                      </div>
                    ) : (
                      <div
                        className={styles.userImgMessage}
                        onClick={() => setImgPreVisiable1(true)}
                      >
                        <Image
                          src={
                            _.content.indexOf("http") !== -1
                              ? _.content
                              : ossImgUrl + _.content
                          }
                          width={"100%"}
                          height={"80%"}
                        />
                        <span className={styles.userImgMessage_right_time}>
                          {dayjs(_.time).format("MM-DD HH:mm:ss")}
                        </span>
                        <ImageViewer
                          image={
                            _.content.indexOf("http") !== -1
                              ? _.content
                              : ossImgUrl + _.content
                          }
                          visible={imgPreVisiable1}
                          onClose={() => {
                            setImgPreVisiable1(false);
                          }}
                        />
                      </div>
                    )}
                    <div className={styles.message_avator}>
                      <Image
                        src={
                          _.icon.indexOf("http") !== -1
                            ? _.icon
                            : ossImgUrl + _.icon
                        }
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
                // console.log(JSON.parse(_.content));
                return (
                  <div className={styles.rechartype_message} key={_.msgId}>
                    <div className={styles.rechartype_title}>
                      待支付金额:{" "}
                      <span>
                        ¥{Number(searchParams.get("orderAmount")) / 100}
                      </span>
                    </div>
                    <div className={styles.rechartype_label}>
                      请点击选择您的充值方式
                    </div>
                    <div className={styles.rechartype_list}>
                      {JSON.parse(_.content).map((itm: any, index: any) => (
                        <div
                          className={styles.type_item}
                          key={itm.id}
                          onClick={() => handleRechargeTypeClick(itm)}
                        >
                          <>
                            <Image
                              src={
                                itm.payCode === "WX_PAY"
                                  ? wxPay
                                  : itm.payCode === "ALI_PAY"
                                  ? aliPay
                                  : unionPay
                              }
                              width={50}
                              height={50}
                              fit="fill"
                              style={{ borderRadius: "10%" }}
                            />
                            <div className={styles.type_name}>
                              {itm.payName}
                            </div>
                          </>
                        </div>
                      ))}
                    </div>
                    <span className={styles.rechartype_right_time}>
                      {dayjs(_.time).format("MM-DD HH:mm:ss")}
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
                            {dayjs(_.time).format("MM-DD HH:mm:ss")}
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
            maxLength={200}
            onChange={(val) => {
              setValue(val);
            }}
          />
        </div>
        <div
          className={styles.messageSend}
          onClick={() => judgeMessage()}
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
        
      </Mask> */}
    {
      visibleMask ?   <div className={ styles.cusMask }>
      <DotLoading color="primary" style={{ fontSize: "30px" }} />
      </div> : null
    }
      <ActionSheet visible={actionSheetVisible} duration={300} onCancel={() => setActionSheetVisible(false)}>
       {
        actionSheetVisible ? <div style={{ padding: '70px 10px' }}>
        <RechargeCom amount={Number(
        searchParams.get("orderAmount")
      )} reTypeP={regTypesList[checkPayType.payCode]} accTypeP={ checkPayType.payImage ? 0 : 1} reNameP={checkPayType.bankAccount} reAccountP={checkPayType.bankNo} reBankNameP={checkPayType.bankName} rePayImageP={checkPayType.payImage ? `${ossImgUrl}${checkPayType.payImage}` : ''} />
     </div> : null
       }
       
      </ActionSheet>
    </div>
  );
});

export default Chat;
