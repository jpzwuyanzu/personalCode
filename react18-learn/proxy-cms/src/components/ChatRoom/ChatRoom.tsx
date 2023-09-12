import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useWebSocket from "@/hooks/useWebSocket";
import { v4 as uuidv4 } from "uuid";
import {
  Input,
  Avatar,
  List,
  Modal,
  Image,
  Card,
  Button,
  Popconfirm,
  message,
  Statistic,
  Popover,
  Badge,
  InputNumber,
  Select,
} from "antd";
import {
  SearchOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import {
  uploadFastImg,
  loadCusList,
  loadCusOrderDetail,
  changeOrderStatus,
  agentReciveType,
  confirmReceiveMoney,
  quickFeedBack,
  loadProxyDetailInfo,
  loadTradeStatic,
} from "@/api/index";
import styles from "./ChatRoom.module.scss";
import dayjs from "dayjs";
import { useAppSelector, useAppDispatch } from "@/hooks/hooks";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { setStorage, getStorage } from "@/utils/common";
import WX_PAY from "@/assets/imgs/paytype/WX_PAY.png";
import ALI_PAY from "@/assets/imgs/paytype/ALI_PAY.png";
import UNION_PAY from "@/assets/imgs/paytype/UNION_PAY.png";
import { switchUnreadNum } from "@/store/slices/message.slice";
import { switchAmountNum } from "@/store/slices/proxy.slice";
import { switchChatPeopleNum } from "@/store/slices/static.slice";
import quickImg from "@/assets/imgs/messageIcon/quick.svg";
import wallateImg from "@/assets/imgs/messageIcon/wallate.svg";
import imageImg from "@/assets/imgs/messageIcon/image.svg";

const { Meta } = Card;
const { Countdown } = Statistic;

//图片资源桶地址
const ossImgUrl = import.meta.env.VITE_APP_OSS_URL;
const { TextArea } = Input;
const ChatRoom = () => {
  //消息列表
  /**
   *type : 1: 客服消息 2:用户消息 3:官方欢迎消息 4:充值方式消息 5:充值链接类型
   */
  const naviagte = useNavigate();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state: any) => state.user.userInfo);
  const [_createWebSocket, ws, wsData] = useWebSocket(
    import.meta.env.VITE_APP_WS_URL,
    {}
  );
  const [cusList, setCusList] = useState<any[]>([]); // 左侧联系人列表
  const [chatUserIndex, setChatUserIndex] = useState<any>(); // 左侧用户列表选中项
  const [fastImgUrl, setFastImgUrl] = useState("");
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [messageList, setMessageList] = useState<any[]>([]);
  const [filterCusList, setFilterCusList] = useState<any[]>([]);
  const [filterCusKey, setFilterCusKey] = useState<any>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [cusOrderInfo, setCusOrderInfo] = useState<any>({});
  const [expayType, setExPayType] = useState<any>([]);
  const [isShowCountDown, setIsShowCountDown] = useState(true);
  const [receive, setReceive] = useState<any>("");
  const [actAmount, setActAmount] = useState<any>(0);
  const [quickList, setQuickList] = useState<any>([]);
  const listEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputMessageRef = useRef<any>(null);

  //快捷回复事件
  const handleQuickMessage = (msg: string) => {
    setInputMessage(msg);
    // inputMessageRef.current?.focus();
    let temp: any = [...messageList];
    let insertMsg: any = {
      fromUserId: `AGENT_${userInfo.id}`, //userInfo.id
      fromUserName: userInfo.name,
      toUserName: cusList[chatUserIndex]["fromUserName"],
      toUserId: cusList[chatUserIndex]["fromUserId"],
      icon: userInfo.headImage,
      content: msg,
      msgType: 0,
      type: 1,
      time: new Date().getTime(),
      orderNumber: cusList[chatUserIndex]["orderNumber"],
      orderAmount: cusList[chatUserIndex]["orderAmount"],
      orderType: "",
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
    setMessageList(temp);
    setInputMessage("");
  };

  //获取快捷回复列表
  const loadQuickReplayList = async () => {
    const res: any = await quickFeedBack({ type: 0 });
    if (res && res.code === 200) {
      console.log(res)
      setQuickList(res.data.list && res.data.list.length ? res.data.list : []);
    }
  };

  //获取快捷发送支付方式列表
  const loadQuickPaytype = async (orderInfo: any) => {
    let res: any = await agentReciveType({ page: 1, pageSize: 100 });
    //在这里过滤出支持当前订单金额的支付方式
    let supportPayTypeList: any = [];
    if (res && res.code && res.code === 200 && res.page.list.length) {
      let typeArr = res.page.list;
      typeArr.forEach((itm: any, _inx: any) => {
        if (itm.amountList.length === 0) {
          supportPayTypeList.push(itm);
        } else if (
          itm.amountList.length &&
          itm.amountList.indexOf(orderInfo.amount) !== -1
        ) {
          supportPayTypeList.push(itm);
        }
      });
      if (supportPayTypeList.length) {
        setExPayType(supportPayTypeList);
      }
    }
  };

  //聊天记录滚动到底部
  const scrollToBottom = () => {
    if (listEndRef && listEndRef.current) {
      listEndRef.current.scrollIntoView({ behavior: "auto" });
    }
  };

  const showPreImgModal = () => {
    setIsModalOpen(true);
  };
  const handlePreImgModalOk = () => {
    setIsModalOpen(false);
    //在这里发送socket消息
    handleMessageSend(1);
  };
  const handlePreImgModalCancel = () => {
    setIsModalOpen(false);
  };

  //上传图片
  const uploadMessageImg = () => {
    let imgFormData = null;
    if (inputRef && inputRef.current) {
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
        // 获取上传图片的本地URL，用于上传前的本地预览
        uploadFastImg(imgFormData).then((res: any) => {
          if (res && res.code && res.code === 200) {
            setFastImgUrl(res.data.fastPath);
            if (URL) {
              setPreviewImgUrl(URL);
              showPreImgModal();
            }
          }
        });
      });
    }
  };

  //查询店铺信息
  const loadProxyStatus = async () => {
    const res: any = await loadProxyDetailInfo({});
    if (res && res.code === 200) {
      dispatch(switchAmountNum(res.data.agent));
    }
  };

  //获取当前代理的订单信息统计
  const loadCurrentProxyStatic = async () => {
    const res: any = await loadTradeStatic({
      page: 1,
      pageSize: 10,
      startTime: dayjs(new Date()).format("YYYY-MM-DD") + " 00:00:00",
      endTime: dayjs(new Date()).format("YYYY-MM-DD") + " 23:59:59",
      agentId: userInfo.id,
    });
    if (res && res.code === 200) {
      // setProxyorderStatic(res.page.list[0]);
      dispatch(
        switchChatPeopleNum(
          res.page.list.length
            ? res.page.list[0]
            : {
                chatPeople: 0,
                totalRechargeCount: 0,
                rechargePeople: 0,
                rechargeCount: 0,
              }
        )
      );
    }
  };

  //打开确认收款弹框
  const handleOpenConfirm = () => {
    //把订单信息赋值给支付类型和实际付款金额
    setReceive(cusOrderInfo.payCode);
    setActAmount(Number(cusOrderInfo.amount) / 100);
    setIsConfirmModalOpen(true);
  };

  //代理确认收款
  const handleConfirmOrder = async () => {
    const res: any = await confirmReceiveMoney({
      orderNo: cusOrderInfo.merchantOrderId,
      payCode: receive,
      realAmount: Number(actAmount) * 100,
    });
    if (res && res.code === 200) {
      setIsConfirmModalOpen(false);
      setIsShowCountDown(false);
      getCusOrderDetail(
        cusList[chatUserIndex]["fromUserId"],
        cusList[chatUserIndex]["orderNumber"]
      );
      loadProxyStatus();
      loadCurrentProxyStatic();
      message.open({
        type: "success",
        content: "确认收款成功",
        className: "custom-class",
        style: {
          marginTop: "20vh",
          fontSize: "20px",
        },
      });
    }
    // switchOrderStatus(cusOrderInfo.merchantOrderId, 1);
  };
  //取消确认订单
  const handleCancelOrder = () => {
    setIsConfirmModalOpen(false);
  };

  const handleCloseOrder = () => {
    switchOrderStatus(cusOrderInfo.merchantOrderId, 4);
  };

  //type: 1: 客服消息 2:用户消息 3:官方欢迎消息 4:充值方式消息 5:充值链接类型
  const handleMessageSend = (msgType: any) => {
    let temp: any = [...messageList];
    let insertMsg: any = {
      fromUserId: `AGENT_${userInfo.id}`, //userInfo.id
      fromUserName: userInfo.name,
      toUserName: cusList[chatUserIndex]["fromUserName"],
      toUserId: cusList[chatUserIndex]["fromUserId"],
      icon: userInfo.headImage,
      content: msgType === 0 ? inputMessage : fastImgUrl,
      msgType: msgType,
      type: 1,
      time: new Date().getTime(),
      orderNumber: cusList[chatUserIndex]["orderNumber"],
      orderAmount: cusList[chatUserIndex]["orderAmount"],
      orderType: "",
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
    setMessageList(temp);
    setInputMessage("");
  };

  //连接建立之后需要发送拉取聊天记录
  const handleMessageHistory = (orderNumber: any) => {
    if (cusList && cusList.length) {
      let insertMsg: any = {
        fromUserId: `AGENT_${userInfo.id}`, //userInfo.id
        fromUserName: userInfo.name,
        content: "",
        msgType: 1,
        type: 1,
        time: new Date().getTime(),
        orderNumber,
        orderAmount: "",
        orderType: "",
        createOrder: 0,
        msgId: uuidv4(),
      };
      ws &&
        ws.readyState === 1 &&
        ws.send(
          JSON.stringify({
            handType: "6",
            message: insertMsg,
          })
        );
    }
  };

  //发送指定的支付方式类型给用户
  const sendPayTypeMessage = (itm: any) => {
    let temp: any = [...messageList];
    let insertMessage: any = {
      chatIndex: uuidv4(),
      fromUserId: `AGENT_${userInfo.id}`, //userInfo.id
      fromUserName: userInfo.name,
      toUserName: cusList[chatUserIndex]["fromUserName"],
      toUserId: cusList[chatUserIndex]["fromUserId"],
      content: JSON.stringify([
        {
          agentId: userInfo.id,
          agentName: userInfo.name,
          amountList: itm.amountList,
          bankAccount: itm.bankAccount,
          bankName: itm.bankName,
          bankNo: itm.bankNo,
          id: itm.id,
          jumpType: itm.jumpType,
          maxAmount: itm.maxAmount,
          minAmount: itm.minAmount,
          payCode: itm.payCode,
          payImage: itm.payImage,
          payName: itm.payName,
          requestTimeStamp: itm.requestTimeStamp,
          seq: itm.seq,
          status: itm.status,
          updateTime: itm.updateTime,
        },
      ]),
      orderNumber: cusList[chatUserIndex]["orderNumber"],
      amount: cusOrderInfo.amount,
      msgId: uuidv4(),
      msgType: 0,
      type: 4,
    };
    ws.send(
      JSON.stringify({
        handType: "3",
        message: JSON.stringify(insertMessage),
      })
    );
    temp.push(insertMessage);
    setMessageList(temp);
    // message.open({
    //   type: "success",
    //   content: "支付方式发送成功",
    //   className: "custom-class",
    //   style: {
    //     marginTop: "20vh",
    //     fontSize: "20px",
    //   },
    // });
  };

  //enter发送消息
  const handleEnterKey = (e: any) => {
    e.preventDefault();
    if (e.nativeEvent.keyCode === 13 && inputMessage) {
      handleMessageSend(0);
    }
  };

  //点击发送按钮发送消息
  const sendMsgNow = () => {
    if (inputMessage) {
      handleMessageSend(0);
    } else {
      message.open({ type: "warning", content: "请输入消息内容" });
    }
  };

  //加载联系人列表
  const loadLeftCusList = async () => {
    const res: any = await loadCusList({});
    if (res.code === 200) {
      if (res.data.chat.length) {
        //这里去判断是否存在未读
        res.data.chat.forEach((itm: any, _inx: any) => {
          if (
            getStorage("session", itm.orderNumber) &&
            Number(getStorage("session", itm.orderNumber))
          ) {
            itm.unread = Number(getStorage("session", itm.orderNumber));
          }
        });
        res.data.chat[0]["unread"] = 0;
        setCusList(res.data.chat);
        setChatUserIndex(0);
        getCusOrderDetail(
          res.data.chat[0]["fromUserId"],
          res.data.chat[0]["orderNumber"]
        );
        loadCurrentProxyStatic();
      }
    }
  };

  //加载当前客户的订单
  const getCusOrderDetail = async (fromUserId: any, orderNumber: any) => {
    const res: any = await loadCusOrderDetail({ fromUserId, orderNumber });
    if (res.code === 200 && res.data && res.data.order) {
      setCusOrderInfo(res.data.order);
      loadQuickPaytype(res.data.order);
    } else {
      setCusOrderInfo({});
    }
  };

  //切换联系人，关闭旧的socket，链接新的socket
  const switchCusSocket = (index: any) => {
    setChatUserIndex(index);
    // ws && ws.close()
    setMessageList([]);
    // createWebSocket()
    let tempCus: any = [];
    cusList.map((itm, _index) => {
      if (itm.orderNumber === cusList[index].orderNumber) {
        itm.unread = 0;
      }
      tempCus.push(itm);
    });
    setCusList(tempCus);
    setStorage("session", cusList[index].orderNumber, 0);
    handleMessageHistory(cusList[index]["orderNumber"]);
    getCusOrderDetail(
      cusList[index]["fromUserId"],
      cusList[index]["orderNumber"]
    );
  };

  const chooseFilterCus = (item: any) => {
    cusList.forEach((itm, inx) => {
      if (item.fromUserId === itm.fromUserId) {
        setFilterCusKey("");
        setFilterCusList([]);
        setChatUserIndex(inx);
        switchCusSocket(inx);
      }
    });
  };

  //修改订单状态
  const switchOrderStatus = async (merchantOrderId: any, payStatus: any) => {
    const res: any = await changeOrderStatus({ merchantOrderId, payStatus });
    if (res.code === 200) {
      setIsShowCountDown(false);
      getCusOrderDetail(
        cusList[chatUserIndex]["fromUserId"],
        cusList[chatUserIndex]["orderNumber"]
      );
      loadCurrentProxyStatic();
    }
  };

  //过滤左侧联系人
  const handleFilterCusList = (val: any) => {
    let temp = [];
    temp = cusList.filter((itm: any) => itm.fromUserName.indexOf(val) !== -1);
    setFilterCusList([...temp]);
  };

  //监听聊天记录，触发滚动到底部操作
  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  useEffect(() => {
    if (wsData && wsData.msgId && wsData.type) {
      if (wsData.orderNumber === cusList[chatUserIndex]["orderNumber"]) {
        setMessageList([...messageList, wsData]);
      } else {
        //记录未读消息数量
        let unRead = getStorage("session", wsData.orderNumber)
          ? getStorage("session", wsData.orderNumber)
          : 0;
        //在这里修改左侧联系人列表的unread属性
        let tempCus: any = [];
        cusList.map((itm, _index) => {
          if (itm.orderNumber === wsData.orderNumber) {
            itm.unread = Number(unRead) + 1;
          }
          tempCus.push(itm);
        });
        setCusList(tempCus);
        setStorage("session", wsData.orderNumber, Number(unRead) + 1);
      }
      //code: 1:代表聊天记录 2:代表新增的联系人
    } else if (wsData && wsData.code === 1) {
      setMessageList(wsData.list);
    } else if (wsData && wsData.code === 2) {
      let res: any = cusList.filter(
        (itm, _inx) => wsData.list[0]["fromUserId"] === itm["fromUserId"]
      );
      if (!res.length) {
        setCusList([...cusList, ...wsData.list]);
      }
      loadCurrentProxyStatic();
    }
  }, [wsData]);

  useEffect(() => {
    if (ws && cusList && cusList.length) {
      uploadMessageImg();
      handleMessageHistory(cusList[chatUserIndex]["orderNumber"]);
    }
  }, [ws, cusList]);

  useEffect(() => {
    loadLeftCusList();
    uploadMessageImg();
    loadQuickReplayList();
    dispatch(switchUnreadNum({ ac: "equal", num: 0 } as any));
    return () => {
      ws && ws.close();
    };
  }, []);

  return (
    <div className={styles.chatRoom_container}>
      {cusList && cusList.length && cusList[chatUserIndex] ? (
        <>
          {/* 联系人列表 */}
          <div className={styles.chatRoom_left_contact}>
            <div className={styles.concat_container}>
              <div className={styles.concat_search}>
                <Input
                  prefix={<SearchOutlined className="site-form-item-icon" />}
                  placeholder="请输入用户昵称"
                  onKeyUp={(val: any) => handleFilterCusList(val.target.value)}
                  onChange={(val) => setFilterCusKey(val.target.value)}
                  value={filterCusKey}
                  style={{ height: '40px', borderRadius: '20px' }}
                />
              </div>
              <div className={styles.concat_list}>
                <List
                  style={{ cursor: "pointer" }}
                  itemLayout="horizontal"
                  dataSource={cusList}
                  renderItem={(item, index) => (
                    <List.Item
                      className={
                        chatUserIndex === index
                          ? styles.activeConcat
                          : styles.normalConcat
                      }
                      style={{ position: "relative" }}
                      onClick={() => switchCusSocket(index)}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            src={`${ossImgUrl}agent/20230831/ff151b8e0d0143a28af70413afce72cd.abc`}
                          />
                        }
                        title={
                          <>
                            <div className={styles.concat_title_info}>
                              <span className={styles.concat_name}>
                                {item.fromUserName}
                              </span>
                              <span className={styles.concat_time}>
                                {dayjs(item.time).format("MM-DD")}
                              </span>
                            </div>
                          </>
                        }
                        description={item.lastMessage}
                      />
                      {item.unread ? (
                        <Badge
                          className={styles.unread_icon}
                          count={item.unread}
                        ></Badge>
                      ) : null}
                    </List.Item>
                  )}
                />
              </div>
              {filterCusList && filterCusList.length ? (
                <>
                  <div className={styles.filterConcat_list}>
                    <List
                      style={{ cursor: "pointer" }}
                      itemLayout="horizontal"
                      dataSource={filterCusList}
                      renderItem={(item, _index) => (
                        <List.Item
                          className={styles.normalConcat}
                          style={{ position: "relative" }}
                          onClick={() => chooseFilterCus(item)}
                        >
                          <List.Item.Meta
                            avatar={
                              <Avatar
                                src={`${ossImgUrl}agent/20230831/ff151b8e0d0143a28af70413afce72cd.abc`}
                              />
                            }
                            title={
                              <>
                                <div className={styles.concat_title_info}>
                                  <span className={styles.concat_name}>
                                    {item.fromUserName}
                                  </span>
                                  <span className={styles.concat_time}>
                                    {dayjs(item.time).format("MM-DD")}
                                  </span>
                                </div>
                              </>
                            }
                            description={item.lastMessage}
                          />
                          {item.unread ? (
                            <Badge
                              className={styles.unread_icon}
                              count={item.unread}
                            ></Badge>
                          ) : null}
                        </List.Item>
                      )}
                    />
                    <div className={styles.noMore_Data}>暂无更多数据</div>
                  </div>
                </>
              ) : null}
            </div>
          </div>
          {/* 聊天信息框 */}
          <div className={styles.chatRoom_right_content}>
            <div className={styles.chatting_item_header}>
              <List
                size="small"
                itemLayout="horizontal"
                dataSource={[cusList[chatUserIndex]]}
                renderItem={(item, _index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={`${ossImgUrl}agent/20230831/ff151b8e0d0143a28af70413afce72cd.abc`}
                          style={{ width: "40px", height: "40px" }}
                        />
                      }
                      title={<span>{item.fromUserName}</span>}
                      description={
                        <span>
                          上次在线时间: {dayjs(item.time).format("MM-DD")}
                        </span>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
            <div className={ userInfo.sayStatus === 1 ? styles.message_wrapper  : styles.message_wrapper_hidden}>
              <div className={styles.message_content}>
                {messageList &&
                  messageList.map((itm: any, _inx) => {
                    switch (itm.type) {
                      case 1:
                        return (
                          <div
                            className={styles.messageList_item}
                            key={itm.msgId}
                          >
                            <div className={styles.cusMessage_container}>
                              <div className={styles.cusMessage_item}>
                                {itm.msgType === 0 ? (
                                  <div className={styles.cus_textMessage}>
                                    {itm.content}
                                    <span className={styles.cusMessage_time}>
                                      {dayjs(itm.time).format("MM-DD HH:mm:ss")}
                                    </span>
                                  </div>
                                ) : (
                                  <div className={styles.cus_imgMessage}>
                                    <Image
                                      width={150}
                                      height={150}
                                      src={
                                        itm.content.indexOf("http") !== -1
                                          ? itm.content
                                          : userInfo.fastUrl + itm.content
                                      }
                                    />
                                    <span className={styles.cusMessage_time}>
                                      {dayjs(itm.time).format("MM-DD HH:mm:ss")}
                                    </span>
                                  </div>
                                )}
                                <img
                                  className={styles.cus_msgIcon}
                                  src={
                                    itm.icon.indexOf("http") !== -1
                                      ? itm.icon
                                      : userInfo.fastUrl + itm.icon
                                  }
                                  alt=""
                                />
                              </div>
                            </div>
                          </div>
                        );
                        break;
                      case 2:
                        return (
                          <div
                            className={styles.messageList_item}
                            key={itm.msgId}
                          >
                            <div className={styles.userMessage_container}>
                              <div className={styles.userMessage_item}>
                                <img
                                  className={styles.user_msgIcon}
                                  src={itm.icon}
                                  alt=""
                                />
                                {itm.msgType === 0 ? (
                                  <div className={styles.user_textMessage}>
                                    {itm.content}
                                    <span className={styles.userMessage_time}>
                                      {dayjs(itm.time).format("MM-DD HH:mm:ss")}
                                    </span>
                                  </div>
                                ) : (
                                  <div className={styles.user_imgMessage}>
                                    <Image
                                      width={150}
                                      height={150}
                                      src={
                                        itm.content.indexOf("http") !== -1
                                          ? itm.content
                                          : userInfo.fastUrl + itm.content
                                      }
                                    />
                                    <span className={styles.userMessage_time}>
                                      {dayjs(itm.time).format("MM-DD HH:mm:ss")}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      case 4:
                        // console.log(JSON.parse(itm.content));
                        return (
                          <div
                            className={styles.messageList_item}
                            key={itm.msgId}
                          >
                            <div className={styles.recharge_type_message}>
                              <div className={styles.recharge_info_line}>
                                待支付金额：¥100
                              </div>
                              <div className={styles.recharge_info_label}>
                                请选择您的支付方式
                              </div>
                              {itm.content &&
                                JSON.parse(itm.content).map(
                                  (_: any, _i: any) => (
                                    <div
                                      className={styles.recharge_type_list}
                                      key={_.id}
                                    >
                                      <div className={styles.type_item}>
                                        <img
                                          className={styles.recharge_type_img}
                                          src={
                                            _.payCode === "WX_PAY"
                                              ? WX_PAY
                                              : _.payCode === "ALI_PAY"
                                              ? ALI_PAY
                                              : UNION_PAY
                                          }
                                          alt=""
                                        />
                                        <div
                                          className={styles.recharge_type_name}
                                        >
                                          {_.payName}
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                              <div className={styles.type_message_time}>
                                {dayjs(itm.time).format("MM-DD HH:mm:ss")}
                              </div>
                            </div>
                          </div>
                        );
                      default:
                        break;
                    }
                  })}
                {/* 这里需要区分几种不同的消息格式,图片格式，官方欢迎消息， 支付方式选择，客服消息，用户消息 */}
              </div>
              <div
                style={{ float: "left", clear: "both" }}
                ref={listEndRef}
              ></div>
            </div>
            <div className={ userInfo.sayStatus === 1 ?  styles.send_message  : styles.send_message_hidden}>
              <div className={styles.top_message_input}>
                {quickList && quickList.length  ?  (
                  <><Popover
                  content={
                    <>
                      {quickList &&
                        quickList.length &&
                        quickList.map((itm: any) => (
                          <div
                            onClick={() => handleQuickMessage(itm.content)}
                            key={itm.id}
                            className={styles.quickBack_Pop}
                          >
                            {itm.content}
                          </div>
                        ))}
                    </>
                  }
                  placement="topLeft"
                  arrow
                >
                  <img src={quickImg} alt="" className={styles.fastMessage} />
                  {/* <UnorderedListOutlined className={styles.fastMessage} /> */}
                </Popover></>
                ) : null}
                <div className={styles.uploadMessageImg}>
                  <img
                    src={imageImg}
                    alt=""
                    className={styles.imageBtn}
                    style={{ cursor: "pointer" }}
                  />
                  {/* <CameraOutlined style={{ cursor: "pointer" }} /> */}
                  <input
                    type="file"
                    accept="image/*"
                    name="uploader-input"
                    className={styles.uploader_file}
                    style={{ cursor: "pointer" }}
                    ref={inputRef}
                  ></input>
                </div>
                <Popover
                  content={
                    <>
                      {expayType &&
                        expayType.length &&
                        expayType.map((itm: any) => (
                          <div
                            key={itm.id}
                            className={styles.payType_line}
                            onClick={() => sendPayTypeMessage(itm)}
                          >
                            <img
                              className={styles.payType_img}
                              src={
                                itm.payCode === "WX_PAY"
                                  ? WX_PAY
                                  : itm.payCode === "ALI_PAY"
                                  ? ALI_PAY
                                  : UNION_PAY
                              }
                              alt=""
                            />
                            <span className={styles.payType_name}>
                              {itm.payName}
                            </span>
                          </div>
                        ))}
                    </>
                  }
                  placement="topLeft"
                  arrow
                >
                  {/* <WalletOutlined className={styles.quickPaytype} /> */}
                  <img className={styles.quickPaytype} src={wallateImg} />
                </Popover>
              </div>
              <div className={userInfo.sayStatus === 1 ?  styles.bottom_message_input : styles.bottom_message_input_hidden}>
                <div className={styles.messageInput}>
                  <TextArea
                    ref={inputMessageRef}
                    size="large"
                    className={styles.message_insert}
                    rows={6}
                    placeholder="请输入消息内容"
                    value={inputMessage}
                    onChange={(val: any) => {
                      setInputMessage(val.target.value);
                    }}
                    onPressEnter={handleEnterKey}
                    disabled={userInfo.sayStatus === 2 ? true : false}
                  />
                  <div className={styles.faceIcon}></div>
                </div>
                <div
                  className={styles.messageSendBtn}
                  onClick={() =>
                    userInfo.sayStatus === 1
                      ? sendMsgNow()
                      : console.log("聊天功能已经被禁用")
                  }
                ></div>
              </div>
            </div>
          </div>
          {/* 用户订单信息 */}
          <div className={styles.chatRoom_right_info}>
            <div className={styles.user_info_item} style={{ height: "22%" }}>
              <Card
                style={{ width: "100%", height: "100%" }}
                // actions={[
                //   <SettingOutlined key="setting" />,
                //   <EditOutlined key="edit" />,
                //   <EllipsisOutlined key="ellipsis" />,
                // ]}
              >
                <Meta
                  // avatar={
                  //   <Avatar
                  //     src={`${ossImgUrl}/agent/20230831/ff151b8e0d0143a28af70413afce72cd.abc`}
                  //   />
                  // }
                  title="用户信息"
                  description={null}
                />
                <>
                  <div className={styles.userInfo_detail}>
                    <div className={styles.detailInfo_item}>
                      <span>昵称：</span>
                      <span>{cusList[chatUserIndex].fromUserName}</span>
                    </div>
                    <div className={styles.detailInfo_item}>
                      <span style={{ whiteSpace: "nowrap" }}>ID：</span>
                      <span>{cusList[chatUserIndex].fromUserId}</span>
                      <CopyToClipboard
                        text={cusList[chatUserIndex].fromUserId}
                        onCopy={() =>
                          message.open({
                            type: "success",
                            content: "复制成功",
                            className: "custom-class",
                            style: {
                              marginTop: "20vh",
                              fontSize: "20px",
                            },
                          })
                        }
                      >
                        <span style={{ marginLeft: "10px", cursor: "pointer" }}>
                          <CopyOutlined />
                        </span>
                      </CopyToClipboard>
                    </div>
                    <div className={styles.detailInfo_item}>
                      <span>来源：</span>
                      <span>
                        {cusList[chatUserIndex].fromUserId.split("_")[0]}
                      </span>
                    </div>
                    <div className={styles.detailInfo_item}>
                      {/* <span>用户备注：</span>
                      <span>章三</span> */}
                    </div>
                  </div>
                  {/* <div className={styles.userRemark}>
                    <span>备注：</span>
                    {isEditRemark ? (
                      <Input
                        placeholder="请输入备注信息"
                        value={remarkInfo}
                        style={{ width: "200px" }}
                        size="small"
                        onChange={(val: any) => setRemarkInfo(val.target.value)}
                      />
                    ) : (
                      <span>{remarkInfo ? remarkInfo : '暂无备注'}</span>
                    )}

                    <div className={styles.remarkOperations}>
                      {isEditRemark ? (
                        <>
                          <span
                            className={styles.cancel_remark}
                            onClick={() => cancelRemarkInfo()}
                          >
                            取消
                          </span>
                          <span
                            className={styles.save_remark}
                            onClick={() => saveRemarkInfo()}
                          >
                            保存
                          </span>
                        </>
                      ) : (
                        <EditOutlined onClick={() => setIsEditRemark(true)} />
                      )}
                    </div>
                  </div> */}
                </>
              </Card>
            </div>
            {/* <div className={styles.user_info_item}>
              <Card
                style={{ width: "100%", height: "100%" }}
                actions={[
                  <SettingOutlined key="setting" />,
                  <EditOutlined key="edit" />,
                  <EllipsisOutlined key="ellipsis" />,
                ]}
              >
                <Meta title="手动充值" description="This is the description" />
              </Card>
            </div> */}
            <div className={styles.userOrder_item}>
              <Card style={{ width: "100%", height: "100%" }}>
                <Meta title="用户订单" />
                <>
                  <div className={styles.order_info_part}>
                    <div className={styles.order_itm}>
                      <span>订单状态:&nbsp;&nbsp;</span>
                      {isShowCountDown && cusOrderInfo.payStatus === 2 ? (
                        <span className={styles.user_OrderStatus}>
                          进行中(
                          <Countdown
                            value={
                              new Date(cusOrderInfo.ms).getTime() +
                              1000 * 30 * 60
                            }
                            format="mm:ss"
                            valueStyle={{ fontSize: "15px", color: "#52C41A" }}
                            onFinish={() => loadLeftCusList()}
                          />
                          )
                        </span>
                      ) : (
                        <span className={styles.user_OrderStatus}>
                          {cusOrderInfo.payStatus === 1
                            ? "已支付"
                            : cusOrderInfo.payStatus === 2
                            ? "未支付"
                            : cusOrderInfo.payStatus === 3
                            ? "取消订单"
                            : "订单关闭"}
                        </span>
                      )}
                    </div>
                    <div className={styles.order_itm}>
                      <span>订单编号:&nbsp;&nbsp;</span>
                      <span>{cusOrderInfo.merchantOrderId}</span>
                    </div>
                    <div className={styles.order_itm}>
                      <span>订单金额:&nbsp;&nbsp;</span>
                      <span>
                        ¥{(Number(cusOrderInfo.amount) / 100).toFixed(2)}
                      </span>
                    </div>
                    <div className={styles.order_itm}>
                      <span>订单类型:&nbsp;&nbsp;</span>
                      <span>
                        {cusOrderInfo.orderType === 1
                          ? "游戏订单"
                          : cusOrderInfo.orderType === 2
                          ? "会员订单"
                          : "金币订单"}
                      </span>
                    </div>
                    <div className={styles.order_itm}>
                      <span>创建时间:&nbsp;&nbsp;</span>
                      <span>
                        {dayjs(
                          new Date(cusOrderInfo.createTime).getTime()
                        ).format("YYYY-MM-DD hh:mm:ss")}
                      </span>
                    </div>
                  </div>
                  <div className={styles.order_operatorBtns}>
                    {/* <Button type="primary">修改价格</Button> */}
                    {cusOrderInfo.payStatus === 2 ? (
                      <>
                        <Button
                          type="primary"
                          onClick={() => handleOpenConfirm()}
                        >
                          确认收款
                        </Button>
                        <Popconfirm
                          title="关闭订单"
                          description="确认关闭该订单吗?"
                          onConfirm={() => handleCloseOrder()}
                          onCancel={() => {}}
                          okText="Yes"
                          cancelText="No"
                        >
                          <Button type="primary" style={{ margin: "0 10px" }}>
                            关闭订单
                          </Button>
                        </Popconfirm>
                      </>
                    ) : null}
                    <Button
                      type="primary"
                      onClick={() => naviagte(`/payment/proxyorder?hisUserId=${cusList[chatUserIndex].fromUserId.split("_")[1]}`)}
                    >
                      查看历史订单
                    </Button>
                  </div>
                </>
              </Card>
            </div>
          </div>
        </>
      ) : null}
      {/* 上传图片预览弹框 */}
      <Modal
        title="上传图片"
        open={isModalOpen}
        onOk={handlePreImgModalOk}
        onCancel={handlePreImgModalCancel}
        width="450px"
        style={{ top: "300px" }}
      >
        <div className={styles.preModalImgContainer}>
          <Image width={200} src={previewImgUrl} />
        </div>
      </Modal>
      {/* 确认订单 */}
      <Modal
        width="450px"
        style={{ top: "300px" }}
        title="确认订单"
        open={isConfirmModalOpen}
        onOk={handleConfirmOrder}
        onCancel={handleCancelOrder}
      >
        <div className={styles.confirm_item}>
          <div className={styles.conLabel}>订单类型:</div>
          <div className={styles.ordContent}>
            {cusOrderInfo.orderType === 1
              ? "游戏充值"
              : cusOrderInfo.orderType === 2
              ? "会员充值"
              : "金币充值"}
          </div>
        </div>
        <div className={styles.confirm_item}>
          <div className={styles.conLabel}>订单金额:</div>
          <div className={styles.ordContent}>
            ¥{(Number(cusOrderInfo.amount) / 100).toFixed(2)}
          </div>
        </div>
        <div className={styles.confirm_item}>
          <div className={styles.conLabel}>支付方式:</div>
          <div className={styles.ordContent}>
            <Select
              placeholder="请选择支付方式"
              style={{ width: 150 }}
              onChange={(val) => setReceive(val)}
              value={receive}
              options={[
                { value: "WX_PAY", label: "微信支付" },
                { value: "ALI_PAY", label: "支付宝" },
                { value: "UNION_PAY", label: "银联支付" },
              ]}
            />
          </div>
        </div>
        <div className={styles.confirm_item}>
          <div className={styles.conLabel}>实付金额:</div>
          <div className={styles.ordContent}>
            <InputNumber
              prefix="¥"
              value={actAmount}
              style={{ width: "150px" }}
              min={0}
              placeholder="请输入实收金额"
              onChange={(val) => setActAmount(val)}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ChatRoom;
