import { useState, useEffect, useRef, memo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Avatar, List, Image, Badge, Tabs, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import styles from "./ChatRoom.module.scss";
import dayjs from "dayjs";
import { useAppSelector } from "@/hooks/hooks";
import Mark from "@/components/MarkText";
import { loadChatRecordHistory } from "@/api/index";
import { getRecentThreeMounth } from "@/utils/common";
import WX_PAY from "@/assets/imgs/paytype/WX_PAY.png";
import ALI_PAY from "@/assets/imgs/paytype/ALI_PAY.png";
import UNION_PAY from "@/assets/imgs/paytype/UNION_PAY.png";

//图片资源桶地址
const ossImgUrl = import.meta.env.VITE_APP_OSS_URL;
const h5UserImg = import.meta.env.VITE_APP_IMG_URL;

const rightTabList: any = [
  {
    key: 0,
    label: "消息",
    children: [],
  },
  {
    key: 1,
    label: "图片",
    children: [],
  },
];

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
  const [messageResult, setMessageResult] = useState<any>([]);
  const [filterCusList, setFilterCusList] = useState<any[]>([]);
  const [filterCusKey, setFilterCusKey] = useState<any>("");
  const [contentKey, setContentKey] = useState<any>("");
  const [activeTab, setActiveTab] = useState<any>(0);
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

  //加载联系人列表
  const loadLeftCusList = async () => {
    const res: any = await loadChatRecordHistory({
      chatGroup: 1,
      startMs: new Date(
        String(dayjs(new Date(searchParams.get("date") as any)).format("YYYY-MM-DD")) + " 00:00:00"
      ).getTime(),
      endMs: new Date(
        String(dayjs(new Date(searchParams.get("date") as any)).format("YYYY-MM-DD")) + " 23:59:59"
      ).getTime(),
      agentId: searchParams.get("agentId"),
      page: 1,
      pageSize: 200,
    });
    if (res.code === 200) {
      if (res.page.list.length) {
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
  const loadChatHistory = async (agentId: any, playerId: any) => {
    const initDate: any = getRecentThreeMounth();
    const res: any = await loadChatRecordHistory({
      chatGroup: 2,
      startMs: new Date(
        String(dayjs(initDate[0]).format("YYYY-MM-DD")) + " 00:00:00"
      ).getTime(),
      endMs: new Date(
        String(dayjs(initDate[1]).format("YYYY-MM-DD")) + " 23:59:59"
      ).getTime(),
      agentId,
      playerId,
      page: 1,
      pageSize: 500,
    });
    if (res.code === 200) {
      if (res.page.list.length) {
        setMessageList(res.page.list);
      }
    }
  };
  //搜索聊天记录
  const searchChatHistory = async (
    agentId: any,
    playerId: any,
    content: any
  ) => {
    if ((activeTab === 0 && content) || activeTab === 1 && !content) {
      const initDate: any = getRecentThreeMounth();
      const res: any = await loadChatRecordHistory({
        chatGroup: 2,
        startMs: new Date(
          String(dayjs(initDate[0]).format("YYYY-MM-DD")) + " 00:00:00"
        ).getTime(),
        endMs: new Date(
          String(dayjs(initDate[1]).format("YYYY-MM-DD")) + " 23:59:59"
        ).getTime(),
        agentId,
        playerId,
        page: 1,
        pageSize: 500,
        content,
        msgType: activeTab
      });
      if (res.code === 200) {
        if (res.page.list && res.page.list.length) {
          let temp:any = [];
          let dateTime:any = [];//图片消息时间
          let imgMsgArr:any = [];

          res.page.list.forEach((itm: any, _inx: any) => {
            if(!((String(itm.content) as any).startsWith('[{') && (String(itm.content) as any).endsWith('}]'))) {
              temp.push(itm)
              dateTime.push(itm.chatTime)
            }
          })
          if(activeTab === 1) {
            //当是图片的时候需要单独处理下格式
            dateTime = Array.from(new Set(dateTime));
            dateTime.forEach((item:any,_index:any) => {
              let list: any = [];
              temp.forEach((msgItem:any, _msginx:any) => {
                if(msgItem.chatTime === item) list.push(msgItem)
              })
              imgMsgArr.push({ "msgKey": item, "list": list})
            })
            setMessageResult([...imgMsgArr])
          } else {
            setMessageResult(temp);
          }
        }
      }
    } else {
      setMessageResult([]);
    }
  };

  //切换联系人
  const switchCusSocket = (index: any) => {
    navigate(
      `/payment/chathistory?playerId=${
        cusList[index]["playerId"]
      }&agentId=${searchParams.get("agentId")}`
    );
    setChatUserIndex(index);
    loadChatHistory(searchParams.get("agentId"), cusList[index]["playerId"]);
    setMessageResult([])
    setActiveTab(0)
  };

  const chooseFilterCus = (item:any) => {
    cusList.forEach((itm, inx) => {
      if(item.playerId === itm.playerId) {
        setFilterCusKey('')
        setFilterCusList([])
        setChatUserIndex(inx)
        switchCusSocket(inx)
      }
    })
  }

    //过滤左侧联系人
    const handleFilterCusList = (val: any) => {
      let temp = [];
      temp = cusList.filter((itm: any) => itm.playerName.indexOf(val) !== -1);
      setFilterCusList([...temp]);
    };

  useEffect(() => {
    setContentKey('')
    if(activeTab === 1) {
      searchChatHistory(searchParams.get("agentId"), searchParams.get("playerId"), '')
    }
  },[activeTab])

  //监听聊天记录，触发滚动到底部操作
  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  useEffect(() => {
    loadLeftCusList();
    loadChatHistory(searchParams.get("agentId"), searchParams.get("playerId"));
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
                        chatUserIndex === index ? styles.activeConcat : ""
                      }
                      style={{ position: "relative" }}
                      onClick={() => switchCusSocket(index)}
                    >
                      <List.Item.Meta
                        avatar={
                          <Avatar
                            src={`${ossImgUrl}${h5UserImg}`}
                          />
                        }
                        title={
                          <>
                            <div className={styles.concat_title_info}>
                              <span className={styles.concat_name}>
                                {item.playerName}
                              </span>
                              <span className={styles.concat_time}>
                                {dayjs(item.chatTime).format("MM-DD")}
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
              {
                filterCusList && filterCusList.length ? (<div className={styles.filterConcat_list}>
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
                              src={`${ossImgUrl}${h5UserImg}`}
                            />
                          }
                          title={
                            <>
                              <div className={styles.concat_title_info}>
                                <span className={styles.concat_name}>
                                  {item.playerName}
                                </span>
                                <span className={styles.concat_time}>
                                  {dayjs(item.chatTime).format("MM-DD")}
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
                </div>) : null
              }
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
                          src={`${ossImgUrl}${h5UserImg}`}
                        />
                      }
                      title={<span>{item.playerName}</span>}
                      description={
                        <span>
                          上次会话日期:{" "}
                          {dayjs(item.chatTime).format("MM-DD")}
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
                  messageList.map((itm: any, _inx) => {
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
                                    {/* {itm.content} */}
                                    <Mark text={itm.content} keyword={contentKey} />
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
                                    {/* {itm.content} */}
                                    <Mark text={itm.content} keyword={contentKey} />
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
                              {JSON.parse(itm.content).map((_: any, _i: any) => (
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
          </div>
          {/* 用户消息搜索 */}
          <div className={styles.chatRoom_right_info}>
            <div className={styles.right_info_tab_container}>
              <Tabs
                activeKey={activeTab}
                items={rightTabList}
                onChange={(val:any) => {
                  setMessageResult([])
                  setActiveTab(val)
                }}
              />
            </div>
            {activeTab === 0 ? (
              <div className={styles.text_message_result}>
                <div className={styles.message_search_input}>
                  <Input
                    placeholder="请输入消息内容"
                    prefix={<SearchOutlined style={{ fontSize: "18px" }} />}
                    onChange={(val) => setContentKey(val.target.value)}
                    onKeyUp={(val: any) =>
                      searchChatHistory(
                        searchParams.get("agentId"),
                        searchParams.get("playerId"),
                        val.target.value
                      )
                    }
                  />
                </div>
                <div className={styles.message_result_container}>
                  {messageResult &&
                    messageResult.map((itm: any, _inx: any) => (
                      <div
                        id={itm.msgId}
                        className={styles.message_result_item}
                        key={itm.msgId}
                        onClick={() => scrollToAnchor(itm.msgId)}
                      >
                        <img
                          className={styles.msg_result_avator}
                          src={
                            itm.headImage &&
                            itm.headImage.indexOf("http") !== -1
                              ? itm.headImage
                              : ossImgUrl + itm.headImage
                          }
                          alt=""
                        />
                        <div className={styles.result_right_part}>
                          <div className={styles.result_top_line}>
                            <span>{itm.fromName}</span>
                            <span>
                              {dayjs(itm.createTime).format("MM-DD HH:mm:ss")}
                            </span>
                          </div>
                          <div className={styles.msg_result_content}>
                            <Mark text={itm.content} keyword={contentKey} />
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            ) : (
              <div className={styles.img_text_result}>
                {
                  messageResult && messageResult.map((itm: any,_inx:any) => (
                  <div className={styles.img_text_item} key={itm.msgKey}>
                    <div className={styles.his_img_time}>
                      <div className={styles.his_img_time_bg}>{itm['msgKey']}</div>
                    </div>
                    <div className={styles.img_text_group}>
                      {
                        itm.list && itm.list.map((img: any, _imgInx: any) => (<img
                          className={styles.his_img}
                          src={`${ossImgUrl}${img.content}`}
                          alt=""
                          key={img.id}
                          id={img.msgId}
                          onClick={() => scrollToAnchor(img.msgId)}
                        />))
                      }
                    </div>
                  </div>
                  ))
                }
              </div>
            )}
          </div>
        </>
      ) : null}
    </div>
  );
});

export default ChatRoom;
