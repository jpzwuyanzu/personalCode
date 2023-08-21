import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useWebSocket from "@/hooks/useWebSocket";
import { v4 as uuidv4 } from "uuid";
import {
  Input,
  Avatar,
  List,
  Dropdown,
  Modal,
  Image,
  Card,
  Button,
  Popconfirm,
  message,
  Statistic
} from "antd";
import {
  SearchOutlined,
  CameraOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
// import BScroll from "@better-scroll/core";
import { uploadFastImg } from "@/api/index";
import styles from "./ChatRoom.module.scss";
// import MouseWheel from "@better-scroll/mouse-wheel";
// BScroll.use(MouseWheel);
import dayjs from "dayjs";
import { useAppSelector } from "@/hooks/hooks";
import { CopyToClipboard } from "react-copy-to-clipboard";

const { Meta } = Card;
const { Countdown } = Statistic;

const style: React.CSSProperties = { background: "#0092ff", padding: "8px 0" };

interface UserItem {
  email: string;
  gender: string;
  name: {
    first: string;
    last: string;
    title: string;
  };
  nat: string;
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
}

const ChatRoom = () => {
  //消息列表
  /**
   *type : 1: 客服消息 2:用户消息 3:官方欢迎消息 4:充值方式消息 5:充值链接类型
   */
  const naviagte = useNavigate();
  const [ws, wsData] = useWebSocket("ws://172.28.113.248:10086/webSocket", {});
  const [messageApi, contextHolder] = message.useMessage();
  const scrollWrapperRef = useRef(null);
  const userInfo = useAppSelector((state: any) => state.user.userInfo);
  const [cusList, setCusList] = useState([
    {
      fromUserId: "jt_1102312",
      fromUserName: "张三",
      icon: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      time: new Date().getTime(),
      unread: 0,
      lastMessage: "这是最后一条消息",
    },
    // {
    //   name: "李四",
    //   id: 2,
    //   icon: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    //   date: "2018-01-14",
    //   unread: 4,
    //   lastMessage: "这是最后一条消息",
    // },
    // {
    //   name: "赵钱孙",
    //   id: 3,
    //   icon: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    //   date: "2018-01-14",
    //   unread: 4,
    //   lastMessage: "这是最后一条消息",
    // },
    // {
    //   name: "王六",
    //   id: 4,
    //   icon: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    //   date: "2018-01-14",
    //   unread: 4,
    //   lastMessage: "这是最后一条消息",
    // },
    // {
    //   name: "阿大",
    //   id: 5,
    //   icon: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    //   date: "2018-01-14",
    //   unread: 4,
    //   lastMessage: "这是最后一条消息",
    // },
    // {
    //   name: "阿大",
    //   id: 5,
    //   icon: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    //   date: "2018-01-14",
    //   unread: 4,
    //   lastMessage: "这是最后一条消息",
    // },
    // {
    //   name: "阿大",
    //   id: 5,
    //   icon: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    //   date: "2018-01-14",
    //   unread: 4,
    //   lastMessage: "这是最后一条消息",
    // },
    // {
    //   name: "阿大",
    //   id: 5,
    //   icon: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    //   date: "2018-01-14",
    //   unread: 4,
    //   lastMessage: "这是最后一条消息",
    // },
    // {
    //   name: "阿大",
    //   id: 5,
    //   icon: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    //   date: "2018-01-14",
    //   unread: 4,
    //   lastMessage: "这是最后一条消息",
    // },
    // {
    //   name: "阿大",
    //   id: 5,
    //   icon: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    //   date: "2018-01-14",
    //   unread: 4,
    //   lastMessage: "这是最后一条消息",
    // },
    // {
    //   name: "阿大",
    //   id: 5,
    //   icon: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
    //   date: "2018-01-14",
    //   unread: 4,
    //   lastMessage: "这是最后一条消息",
    // },
  ]); // 左侧联系人列表
  const [chatUserIndex, setChatUserIndex] = useState(0); // 左侧用户列表选中项
  const [fastImgUrl, setFastImgUrl] = useState("");
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [messageList, setMessageList] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const [isEditRemark, setIsEditRemark] = useState(false);
  const [remarkInfo, setRemarkInfo] = useState("");
  const listEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inputMessageRef = useRef<any>(null);

  //快捷回复事件
  const handleQuickMessage = (msg: string) => {
    setInputMessage(msg);
    inputMessageRef.current?.focus();
  };

  //快捷回复列表
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div onClick={() => handleQuickMessage("快捷回复1")}>快捷回复1</div>
      ),
    },
    {
      key: "2",
      label: (
        <div onClick={() => handleQuickMessage("快捷回复2")}>快捷回复2</div>
      ),
    },
    {
      key: "3",
      label: (
        <div onClick={() => handleQuickMessage("快捷回复3")}>快捷回复3</div>
      ),
    },
  ];

  //取消备注信息
  const cancelRemarkInfo = () => {
    setIsEditRemark(false);
  };
  //保存备注信息
  const saveRemarkInfo = () => {
    setIsEditRemark(false);
    //在这里调用保存
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
    console.log("在这里发送socket消息");
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
            setFastImgUrl(res.data.fastUrl + res.data.fastPath);
            if (URL) {
              console.log(URL);
              setPreviewImgUrl(URL);
              showPreImgModal();
            }
          }
        });
      });
    }
  };

  const handleConfirmOrder = () => {
    setIsConfirmModalOpen(false);
  };
  const handleCancelOrder = () => {
    setIsConfirmModalOpen(false);
  };
  //type: 1: 客服消息 2:用户消息 3:官方欢迎消息 4:充值方式消息 5:充值链接类型
  const handleMessageSend = (msgType: any) => {
    let temp: any = [...messageList];
    let insertMsg: any = {
      fromUserId: "agent_70", //userInfo.id
      fromUserName: "张三",
      toUserName: cusList[chatUserIndex]["fromUserName"],
      toUserId: cusList[chatUserIndex]["fromUserId"],
      icon: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
      content: msgType === 0 ? inputMessage : fastImgUrl,
      msgType: msgType,
      type: 1,
      time: new Date().getTime(),
      oredrNumber: "",
      orderAmount: "",
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

  //enter发送消息
  const handleEnterKey = (e: any) => {
    console.log(e);
    if (e.nativeEvent.keyCode === 13) {
      handleMessageSend(0);
    }
  };

  //监听聊天记录，触发滚动到底部操作
  useEffect(() => {
    scrollToBottom();
  }, [messageList]);

  useEffect(() => {
    console.log("webSocket message:", wsData);
    uploadMessageImg();
  }, []);

  useEffect(() => {
    console.log(wsData);
    console.log(messageList);
    if (wsData && wsData.msgId) {
      setMessageList([...messageList, wsData]);
    }
  }, [wsData]);

  return (
    <div className={styles.chatRoom_container}>
      {/* 联系人列表 */}
      <div className={styles.chatRoom_left_contact}>
        <div className={styles.concat_container}>
          <div className={styles.concat_search}>
            <Input
              prefix={<SearchOutlined className="site-form-item-icon" />}
              placeholder="搜索"
            />
          </div>
          <div className={styles.concat_list}>
            <List
              style={{ cursor: "pointer" }}
              itemLayout="horizontal"
              dataSource={cusList}
              renderItem={(item, index) => (
                <List.Item
                  className={chatUserIndex === index ? styles.activeConcat : ""}
                >
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                      />
                    }
                    title={
                      <>
                        <div className={styles.concat_title_info}>
                          <a
                            className={styles.concat_name}
                            href="https://ant.design"
                          >
                            {item.fromUserName}
                          </a>
                          <span className={styles.concat_time}>
                            {dayjs(item.time).format("MM-DD HH:mm")}
                          </span>
                        </div>
                      </>
                    }
                    description={item.lastMessage}
                  />
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
                      src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                    />
                  }
                  title={<a href="https://ant.design">{item.fromUserName}</a>}
                  description={
                    <span>
                      上次在线时间: {dayjs(item.time).format("HH:mm:ss")}
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
              messageList.map((itm: any) => (
                <div className={styles.messageList_item} key={itm.msgId}>
                  {itm.type === 1 ? (
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
                            <Image width={150} height={150} src={itm.content} />
                            <span className={styles.cusMessage_time}>
                              {dayjs(itm.time).format("MM-DD HH:mm:ss")}
                            </span>
                          </div>
                        )}
                        <img
                          className={styles.cus_msgIcon}
                          src={itm.icon}
                          alt=""
                        />
                      </div>
                    </div>
                  ) : (
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
                            <Image width={150} height={150} src={itm.content} />
                            <span className={styles.userMessage_time}>
                              {dayjs(itm.time).format("MM-DD HH:mm:ss")}
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            {/* 这里需要区分几种不同的消息格式,图片格式，官方欢迎消息， 支付方式选择，客服消息，用户消息 */}
          </div>
          <div style={{ float: "left", clear: "both" }} ref={listEndRef}></div>
        </div>
        <div className={styles.send_message}>
          <Dropdown menu={{ items }} placement="topLeft" arrow>
            <div className={styles.fastMessage}></div>
          </Dropdown>
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
              avatar={
                <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />
              }
              title="用户信息"
              description={
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
                        <span style={{ marginLeft: "10px" }}>
                          <CopyOutlined />
                        </span>
                      </CopyToClipboard>
                    </div>
                    <div className={styles.detailInfo_item}>
                      <span>来源：</span>
                      <span>章三</span>
                    </div>
                    <div className={styles.detailInfo_item}>
                      {/* <span>用户备注：</span>
                      <span>章三</span> */}
                    </div>
                  </div>
                  <div className={styles.userRemark}>
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
                  </div>
                </>
              }
            />
          </Card>
        </div>
        <div className={styles.user_info_item}>
          <Card
            style={{ width: "100%", height: "100%" }}
            actions={[
              <SettingOutlined key="setting" />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta
              // avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
              title="手动充值"
              description="This is the description"
            />
          </Card>
        </div>
        <div className={styles.userOrder_item}>
          <Card
            style={{ width: "100%", height: "100%" }}
            // actions={[
            //   <SettingOutlined key="setting" />,
            //   <EditOutlined key="edit" />,
            //   <EllipsisOutlined key="ellipsis" />,
            // ]}
          >
            <Meta
              // avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel" />}
              title="用户订单"
              // description="This is the description"
            />
            <>
              <div className={styles.order_info_part}>
                <div className={styles.order_itm}>
                  <span>订单状态:&nbsp;&nbsp;</span>
                  <span className={styles.user_OrderStatus}>
                    进行中(29:12:30)
                    {/* (<Countdown
                    value={
                      new Date(record.createTime).getTime() + 1000 * 30 * 60
                    }
                    format="mm:ss"
                    valueStyle={{ fontSize: "15px", color: "#52C41A" }}
                  />) */}
                  </span>
                </div>
                <div className={styles.order_itm}>
                  <span>订单编号:&nbsp;&nbsp;</span>
                  <span>IM4893569655655555</span>
                </div>
                <div className={styles.order_itm}>
                  <span>订单金额:&nbsp;&nbsp;</span>
                  <span>¥10000.00</span>
                </div>
                <div className={styles.order_itm}>
                  <span>订单类型:&nbsp;&nbsp;</span>
                  <span>游戏充值/金币充值/会员充值</span>
                </div>
                <div className={styles.order_itm}>
                  <span>创建时间:&nbsp;&nbsp;</span>
                  <span>2020.02.02 12:20:32</span>
                </div>
                <div className={styles.order_itm}>
                  <span>结束时间:&nbsp;&nbsp;</span>
                  <span>2020.02.02 12:20:32</span>
                </div>
              </div>
              <div className={styles.order_operatorBtns}>
                <Button
                  type="primary"
                  onClick={() => setIsConfirmModalOpen(true)}
                >
                  确认收款
                </Button>
                {/* <Button type="primary">修改价格</Button> */}
                <Popconfirm
                  title="关闭订单"
                  description="确认关闭该订单吗?"
                  onConfirm={() => {}}
                  onCancel={() => {}}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button type="primary" style={{ margin: "0 10px" }}>
                    关闭订单
                  </Button>
                </Popconfirm>

                <Button
                  type="primary"
                  onClick={() => naviagte("/payment/proxyorder")}
                >
                  查看历史订单
                </Button>
              </div>
            </>
          </Card>
        </div>
      </div>
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
        width="400px"
        style={{ top: "300px" }}
        title="确认订单"
        open={isConfirmModalOpen}
        onOk={handleConfirmOrder}
        onCancel={handleCancelOrder}
      >
        <div className={styles.confirm_item}>
          <div className={styles.conLabel}>订单类型:</div>
          <div className={styles.ordContent}>金币充值</div>
        </div>
        <div className={styles.confirm_item}>
          <div className={styles.conLabel}>订单金额:</div>
          <div className={styles.ordContent}>¥1000</div>
        </div>
        <div className={styles.confirm_item}>
          <div className={styles.conLabel}>支付方式:</div>
          <div className={styles.ordContent}>支付宝</div>
        </div>
        <div className={styles.confirm_item}>
          <div className={styles.conLabel}>实付金额:</div>
          <div className={styles.ordContent}>1000</div>
        </div>
      </Modal>
    </div>
  );
};

export default ChatRoom;
