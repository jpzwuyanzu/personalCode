import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useWebSocket from "@/hooks/useWebSocket";
import {
  Input,
  Col,
  Divider,
  Row,
  Avatar,
  List,
  Dropdown,
  message,
  Modal,
  Image,
  Card,
  Button,
  Popconfirm,
} from "antd";
import {
  SearchOutlined,
  CameraOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import BScroll from "@better-scroll/core";
import { uploadFastImg } from "@/api/index";
import styles from "./ChatRoom.module.scss";
import MouseWheel from "@better-scroll/mouse-wheel";
BScroll.use(MouseWheel);

const { Meta } = Card;

const style: React.CSSProperties = { background: "#0092ff", padding: "8px 0" };

//快捷回复列表
const items: MenuProps["items"] = [
  {
    key: "1",
    label: <div>1st menu item 1st menu item 1st menu item</div>,
  },
  {
    key: "2",
    label: <div>1st menu item 1st menu 1st menu item 1st menu item</div>,
  },
  {
    key: "3",
    label: <div>1st menu item 1st menu item 1st menu item 1st menu item</div>,
  },
];

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
  const naviagte = useNavigate();
  const [ws, wsData] = useWebSocket("ws://172.28.113.248:10086/webSocket", {});
  const scrollWrapperRef = useRef(null);
  // 左侧联系人列表
  const [cusList, setCusList] = useState([
    {
      name: "章三",
      id: 1,
      icon: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      date: "2018-01-14",
      unread: 4,
      lastMessage: "这是最后一条消息",
    },
    {
      name: "李四",
      id: 2,
      icon: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      date: "2018-01-14",
      unread: 4,
      lastMessage: "这是最后一条消息",
    },
    {
      name: "赵钱孙",
      id: 3,
      icon: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      date: "2018-01-14",
      unread: 4,
      lastMessage: "这是最后一条消息",
    },
    {
      name: "王六",
      id: 4,
      icon: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      date: "2018-01-14",
      unread: 4,
      lastMessage: "这是最后一条消息",
    },
    {
      name: "阿大",
      id: 5,
      icon: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      date: "2018-01-14",
      unread: 4,
      lastMessage: "这是最后一条消息",
    },
    {
      name: "阿大",
      id: 5,
      icon: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      date: "2018-01-14",
      unread: 4,
      lastMessage: "这是最后一条消息",
    },
    {
      name: "阿大",
      id: 5,
      icon: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      date: "2018-01-14",
      unread: 4,
      lastMessage: "这是最后一条消息",
    },
    {
      name: "阿大",
      id: 5,
      icon: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      date: "2018-01-14",
      unread: 4,
      lastMessage: "这是最后一条消息",
    },
    {
      name: "阿大",
      id: 5,
      icon: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      date: "2018-01-14",
      unread: 4,
      lastMessage: "这是最后一条消息",
    },
    {
      name: "阿大",
      id: 5,
      icon: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      date: "2018-01-14",
      unread: 4,
      lastMessage: "这是最后一条消息",
    },
    {
      name: "阿大",
      id: 5,
      icon: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      date: "2018-01-14",
      unread: 4,
      lastMessage: "这是最后一条消息",
    },
  ]);
  //当前正在聊天的用户
  const [chattingUser, setChattingUser] = useState([
    {
      name: "章三",
      id: 1,
      icon: "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png",
      date: "2018-01-14",
      unread: 4,
      lastMessage: "这是最后一条消息",
    },
  ]);
  const [chatUserIndex, setChatUserIndex] = useState(-1); // 左侧用户列表选中项
  const [data, setData] = useState<UserItem[]>([]);
  const [fastImgUrl, setFastImgUrl] = useState("");
  const [previewImgUrl, setPreviewImgUrl] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  //消息列表
  /**
   *type : 1: 客服消息 2:用户消息 3:官方欢迎消息 4:充值方式消息 5:充值链接类型
   */
  const messageList = [
    {
      id: 1,
      icon: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
      msg: {
        content:
          "欢迎使用官方代理充值,请按照提示操作充值请按照提示操作充值请按照提示操作充值请按照提示操作充值请按照提示操作充值请按照提示操作充值!",
        msgT: 0, //0: 代表文字消息， 1: 代表图片
      },
      type: 1,
      time: new Date().getTime(),
    },
    {
      id: 2,
      icon: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
      msg: {
        content:
          "欢迎使用官方代理充值,请按照提示操作充值请按照提示操作充值请按照提示操作充值请按照提示操作充值请按照提示操作充值请按照提示操作充值!",
        msgT: 0, //0: 代表文字消息， 1: 代表图片
      },
      type: 2,
      time: new Date().getTime(),
    },
    {
      id: 3,
      icon: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
      msg: {
        content:
          "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
        msgT: 1, //0: 代表文字消息， 1: 代表图片
      },
      type: 1,
      time: new Date().getTime(),
    },
    {
      id: 4,
      icon: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
      msg: {
        content:
          "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
        msgT: 1, //0: 代表文字消息， 1: 代表图片
      },
      type: 2,
      time: new Date().getTime(),
    },
    {
      id: 5,
      icon: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
      msg: {
        content:
          "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
        msgT: 1, //0: 代表文字消息， 1: 代表图片
      },
      type: 2,
      time: new Date().getTime(),
    },
    {
      id: 6,
      icon: "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
      msg: {
        content:
          "https://images.unsplash.com/photo-1567945716310-4745a6b7844b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=60",
        msgT: 1, //0: 代表文字消息， 1: 代表图片
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
        msgT: 1, //0: 代表文字消息， 1: 代表图片
      },
      type: 2,
      time: new Date().getTime(),
    },
  ];

  const showPreImgModal = () => {
    setIsModalOpen(true);
  };
  const handlePreImgModalOk = () => {
    setIsModalOpen(false);
    //在这里发送socket消息
    console.log("在这里发送socket消息");
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

  useEffect(() => {
    let scroll = new BScroll(scrollWrapperRef.current as any, {
      mouseWheel: true,
    });
  }, []);

  useEffect(() => {
    console.log("webSocket message:", wsData);
    uploadMessageImg();
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
                <List.Item>
                  <List.Item.Meta
                    avatar={
                      <Avatar
                        src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                      />
                    }
                    title={<a href="https://ant.design">{item.name}</a>}
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
            dataSource={chattingUser}
            renderItem={(item, index) => (
              <List.Item>
                <List.Item.Meta
                  avatar={
                    <Avatar
                      src={`https://xsgames.co/randomusers/avatar.php?g=pixel&key=${index}`}
                    />
                  }
                  title={<a href="https://ant.design">{item.name}</a>}
                  description={<span>上次上线时间</span>}
                />
              </List.Item>
            )}
          />
        </div>
        <div ref={scrollWrapperRef} className={styles.message_wrapper}>
          <div className={styles.message_content}>
            {messageList &&
              messageList.map((itm) => (
                <div className={styles.messageList_item} key={itm.id}>
                  {itm.type === 1 ? (
                    <div className={styles.cusMessage_container}>
                      <div className={styles.cusMessage_item}>
                        <img
                          className={styles.cus_msgIcon}
                          src={itm.icon}
                          alt=""
                        />
                        {itm.msg.msgT === 0 ? (
                          <div className={styles.cus_textMessage}>
                            {itm.msg.content}
                            <span className={styles.cusMessage_time}>
                              2023-08-17
                            </span>
                          </div>
                        ) : (
                          <div className={styles.cus_imgMessage}>
                            <Image
                              width={150}
                              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            />
                            <span className={styles.cusMessage_time}>
                              2023-08-17
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div className={styles.userMessage_container}>
                      <div className={styles.userMessage_item}>
                        {itm.msg.msgT === 0 ? (
                          <div className={styles.user_textMessage}>
                            {itm.msg.content}
                            <span className={styles.userMessage_time}>
                              2023-08-17
                            </span>
                          </div>
                        ) : (
                          <div className={styles.user_imgMessage}>
                            <Image
                              width={150}
                              src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                            />
                            <span className={styles.userMessage_time}>
                              2023-08-17
                            </span>
                          </div>
                        )}
                        <img
                          className={styles.user_msgIcon}
                          src={itm.icon}
                          alt=""
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
            {/* 这里需要区分几种不同的消息格式,图片格式，官方欢迎消息， 支付方式选择，客服消息，用户消息 */}
          </div>
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
              size="large"
              className={styles.message_insert}
              placeholder="请输入消息内容"
            />
            <div className={styles.faceIcon}></div>
          </div>
          <div className={styles.messageSendBtn}></div>
        </div>
      </div>
      {/* 用户订单信息 */}
      <div className={styles.chatRoom_right_info}>
        <div className={styles.user_info_item} style={{ height: "17%" }}>
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
                      <span>用户昵称：</span>
                      <span>章三</span>
                    </div>
                    <div className={styles.detailInfo_item}>
                      <span>用户ID：</span>
                      <span>章三</span>
                    </div>
                    <div className={styles.detailInfo_item}>
                      <span>用户来源：</span>
                      <span>章三</span>
                    </div>
                    <div className={styles.detailInfo_item}>
                      <span>用户备注：</span>
                      <span>章三</span>
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
                    {" "}
                    进行中(29:23:50)
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
