import { useState, useEffect, useRef, memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, List, Image, Badge } from "antd";
import styles from "./ChatRoom.module.scss";
import dayjs from "dayjs";
import { useAppSelector } from "@/hooks/hooks";
import { setStorage, getStorage } from "@/utils/common";
import { loadChatRecordHistory } from "@/api/index";
import { getRecentThreeMounth } from "@/utils/common";
import WX_PAY from "@/assets/imgs/paytype/WX_PAY.png";
import ALI_PAY from "@/assets/imgs/paytype/ALI_PAY.png";
import UNION_PAY from "@/assets/imgs/paytype/UNION_PAY.png";

//图片资源桶地址
const ossImgUrl = "https://hk-jmcy.oss-cn-hongkong.aliyuncs.com/";

const ChatRoom = memo(() => {
  //消息列表
  /**
   *type : 1: 客服消息 2:用户消息 3:官方欢迎消息 4:充值方式消息 5:充值链接类型
   */
  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const userInfo = useAppSelector((state: any) => state.user.userInfo);
  const [cusList, setCusList] = useState<any[]>([]); // 左侧联系人列表
  const [chatUserIndex, setChatUserIndex] = useState<any>(); // 左侧用户列表选中项
  const [messageList, setMessageList] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const listEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToAnchor = (anchorName: any) => {
    if (anchorName) {
      let anchorElement = document.getElementById(anchorName);
      if (anchorElement) {
        anchorElement.scrollIntoView();
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

  //加载联系人列表
  const loadLeftCusList = async () => {
    console.log(dayjs(new Date()).format("YYYY-MM-DD"));
    const res: any = await loadChatRecordHistory({
      chatGroup: 1,
      startMs: new Date(
        String(dayjs(new Date()).format("YYYY-MM-DD")) + " 00:00:00"
      ).getTime(),
      endMs: new Date(
        String(dayjs(new Date()).format("YYYY-MM-DD")) + " 23:59:59"
      ).getTime(),
      agentId: searchParams.get("agentId"),
      page: 1,
      pageSize: 200,
    });
    console.log(res)
    if (res.code === 200) {
      if (res.page.list && res.page.list.length) {
        setCusList(res.page.list);
        res.page.list.forEach((itm: any, inx: any) => {
          if (itm.playerId === searchParams.get("playerId")) {
            setChatUserIndex(inx);
          }
        });
      }
    }
  };

  //加载聊天聊天记录
  const loadChatHistory = async () => {
    const initDate: any = getRecentThreeMounth();
    const res: any = await loadChatRecordHistory({
      chatGroup: 2,
      startMs: new Date(
        String(dayjs(initDate[0]).format("YYYY-MM-DD")) + " 00:00:00"
      ).getTime(),
      endMs: new Date(
        String(dayjs(initDate[1]).format("YYYY-MM-DD")) + " 23:59:59"
      ).getTime(),
      agentId: searchParams.get("agentId"),
      playerId: searchParams.get("playerId"),
      page: 1,
      pageSize: 500,
    });
    console.log(res);
    if (res.code === 200) {
      if (res.page.list && res.page.list.length) {
        //   let temp = res.page.list;
        // temp.forEach((itm: any, inx: any) => {
        //   if (itm.type === 4) {
        //     itm.content = itm.content.split(".com/")[1];
        //   }
        // });
        // let tempMessageList:any = [];
        // res.page.list.forEach((itm: any, inx:any) => {
        //   if(itm.type !== 4) tempMessageList.push(itm)
        // })
        console.log(res.page.list);
        setMessageList(res.page.list);
      }
    }
  };

  const switchCusSocket = (index: any) => {
    console.log(cusList[index]["playerId"]);
    navigate(
      `/payment/chathistory?playerId=${
        cusList[index]["playerId"]
      }&agentId=${searchParams.get("agentId")}`
    );
    setChatUserIndex(index);
    loadChatHistory();
  };

  //监听聊天记录，触发滚动到底部操作
  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  useEffect(() => {
    loadLeftCusList();
    loadChatHistory();
  }, []);

  return (
    <div className={styles.chatRoom_container}>
      {cusList && cusList.length && cusList[chatUserIndex] ? (
        <>
          {/* 联系人列表 */}
          <div className={styles.chatRoom_left_contact}>
            <div className={styles.concat_container}>
              <div className={styles.concat_search}>
                {/* <Input
              prefix={<SearchOutlined className="site-form-item-icon" />}
              placeholder="搜索"
            /> */}
                <div className={styles.concat_top_title}>联系人列表</div>
              </div>
              <div className={styles.concat_list}>
                <List
                  style={{ cursor: "pointer" }}
                  itemLayout="horizontal"
                  dataSource={cusList}
                  renderItem={(item, index) => (
                    <List.Item
                      className={
                        chatUserIndex === index ? styles.activeConcat : ""
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
                                {item.playerName}
                              </span>
                              <span className={styles.concat_time}>
                                {dayjs(item.chatTime).format("MM-DD HH:mm")}
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
            </div>
          </div>
          {/* 聊天信息框 */}
          <div className={styles.chatRoom_right_content}>
            <div className={styles.chatting_item_header}>
              <List
                size="small"
                itemLayout="horizontal"
                dataSource={[cusList[chatUserIndex]]}
                renderItem={(item, index) => (
                  <List.Item>
                    <List.Item.Meta
                      avatar={
                        <Avatar
                          src={`${ossImgUrl}agent/20230831/ff151b8e0d0143a28af70413afce72cd.abc`}
                        />
                      }
                      title={<span>{item.playerName}</span>}
                      description={
                        <span>
                          上次在线时间:{" "}
                          {dayjs(item.chatTime).format("MM-DD HH:mm")}
                        </span>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
            <div className={styles.message_wrapper}>
              <div className={styles.message_content}>
                {messageList &&
                  messageList.map((itm: any, inx) => {
                    switch (itm.type) {
                      case 1:
                        return (
                          <div
                            className={styles.messageList_item}
                            key={itm.msgId}
                            id={itm.msgId}
                          >
                            <div className={styles.cusMessage_container}>
                              <div className={styles.cusMessage_item}>
                                {itm.msgType === 0 ? (
                                  <div className={styles.cus_textMessage}>
                                    {itm.content}
                                    <span className={styles.cusMessage_time}>
                                      {dayjs(itm.createTime).format(
                                        "MM-DD HH:mm:ss"
                                      )}
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
                                      {dayjs(itm.createTime).format(
                                        "MM-DD HH:mm:ss"
                                      )}
                                    </span>
                                  </div>
                                )}
                                <img
                                  className={styles.cus_msgIcon}
                                  src={
                                    itm.headImage &&
                                    itm.headImage.indexOf("http") !== -1
                                      ? itm.headImage
                                      : ossImgUrl + itm.headImage
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
                            id={itm.msgId}
                          >
                            <div className={styles.userMessage_container}>
                              <div className={styles.userMessage_item}>
                                <img
                                  className={styles.user_msgIcon}
                                  src={
                                    itm.headImage &&
                                    itm.headImage.indexOf("http") !== -1
                                      ? itm.headImage
                                      : ossImgUrl + itm.headImage
                                  }
                                  alt=""
                                />
                                {itm.msgType === 0 ? (
                                  <div className={styles.user_textMessage}>
                                    {itm.content}
                                    <span className={styles.userMessage_time}>
                                      {dayjs(itm.createTime).format(
                                        "MM-DD HH:mm:ss"
                                      )}
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
                                      {dayjs(itm.createTime).format(
                                        "MM-DD HH:mm:ss"
                                      )}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                        break;
                      case 4:
                        console.log(JSON.parse(itm.content))
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
                              {JSON.parse(itm.content).map((_: any, i: any) => (
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
                                    <div className={styles.recharge_type_name}>
                                      {_.payName}
                                    </div>
                                  </div>
                                </div>
                              ))}
                              <div className={styles.type_message_time}>
                                {dayjs(itm.time).format("MM-DD HH:mm:ss")}
                              </div>
                            </div>
                          </div>
                        );
                        break;
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
            {/* <div className={styles.send_message}>
              <Popover
                content={
                  <>
                    {quickList &&
                      quickList.length &&
                      quickList.map((itm: any) => (
                        <div
                          onClick={() => handleQuickMessage(itm.content)}
                          key={itm.id}
                          style={{ cursor: "pointer" }}
                        >
                          {itm.content}
                        </div>
                      ))}
                  </>
                }
                placement="topLeft"
                arrow
              >
                <div className={styles.fastMessage}></div>
              </Popover>
              <div className={styles.uploadMessageImg}>
                <CameraOutlined style={{ cursor: "pointer" }} />
                <input
                  type="file"
                  accept="image/*"
                  name="uploader-input"
                  className={styles.uploader_file}
                  style={{ cursor: "pointer" }}
                  ref={inputRef}
                ></input>
              </div>
              <div className={styles.messageInput}>
                <Input
                  ref={inputMessageRef}
                  size="large"
                  className={styles.message_insert}
                  placeholder="请输入消息内容"
                  value={inputMessage}
                  onChange={(val: any) => {
                    console.log(val);
                    setInputMessage(val.target.value);
                  }}
                  onPressEnter={handleEnterKey}
                />
                <div className={styles.faceIcon}></div>
              </div>
              <div
                className={styles.messageSendBtn}
                onClick={() => handleMessageSend(0)}
              ></div>
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
                <AlipayCircleOutlined className={styles.quickPaytype} />
              </Popover>
            </div> */}
          </div>
          {/* 用户订单信息 */}
          <div className={styles.chatRoom_right_info}>
            <div
              onClick={() =>
                scrollToAnchor("f1281fa0-3b06-4240-9fcf-33279a577969")
              }
            >
              锚点
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
});

export default ChatRoom;
