import { useState, useEffect, useRef } from "react";
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
} from "antd";
import { SearchOutlined, CameraOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import BScroll from "@better-scroll/core";
import { uploadFastImg } from "@/api/index";
import styles from "./ChatRoom.module.scss";
import MouseWheel from "@better-scroll/mouse-wheel";
BScroll.use(MouseWheel);

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
  const [ws, wsData] = useWebSocket("ws://172.28.113.232:10086/webSocket", {});
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
  const inputRef = useRef<HTMLInputElement>(null);
  //消息列表
  const messageList = [
    {
      name: "tom",
      type: 0,
      date: "2023-07-24",
      messageType: 0,
      message: "这是消息001",
      id: 1,
    },
    {
      name: "tom",
      type: 0,
      date: "2023-07-24",
      messageType: 0,
      message: "这是消息002",
      id: 2,
    },
    {
      name: "tom",
      type: 0,
      date: "2023-07-24",
      messageType: 0,
      message: "这是消息003",
      id: 3,
    },
    {
      name: "tom",
      type: 0,
      date: "2023-07-24",
      messageType: 0,
      message: "这是消息004",
      id: 4,
    },
    {
      name: "tom",
      type: 0,
      date: "2023-07-24",
      messageType: 0,
      message: "这是消息005",
      id: 5,
    },
    {
      name: "tom",
      type: 0,
      date: "2023-07-24",
      messageType: 0,
      message: "这是消息006",
      id: 6,
    },
    {
      name: "tom",
      type: 0,
      date: "2023-07-24",
      messageType: 0,
      message: "这是消息007",
      id: 7,
    },
    {
      name: "tom",
      type: 0,
      date: "2023-07-24",
      messageType: 0,
      message: "这是消息008",
      id: 8,
    },
    {
      name: "tom",
      type: 0,
      date: "2023-07-24",
      messageType: 0,
      message: "这是消息009",
      id: 9,
    },
    {
      name: "tom",
      type: 0,
      date: "2023-07-24",
      messageType: 0,
      message: "这是消息010",
      id: 10,
    },
    {
      name: "tom",
      type: 0,
      date: "2023-07-24",
      messageType: 0,
      message: "这是消息011",
      id: 11,
    },
    {
      name: "tom",
      type: 0,
      date: "2023-07-24",
      messageType: 0,
      message: "这是消息012",
      id: 12,
    },
    {
      name: "tom",
      type: 0,
      date: "2023-07-24",
      messageType: 0,
      message: "这是消息013",
      id: 13,
    },
    {
      name: "tom",
      type: 0,
      date: "2023-07-24",
      messageType: 0,
      message: "这是消息014",
      id: 14,
    },
    {
      name: "tom",
      type: 0,
      date: "2023-07-24",
      messageType: 0,
      message: "这是消息015",
      id: 15,
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
                  {itm.message}
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
            <CameraOutlined style={{ cursor: 'pointer' }} />
            <input
              type="file"
              accept="image/*"
              name="uploader-input"
              className={styles.uploader_file}
              style={{ cursor: 'pointer' }}
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
        <Row gutter={24}>
          <Col className="gutter-row" span={12}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div style={style}>col-6</div>
          </Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row gutter={24}>
          <Col className="gutter-row" span={12}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div style={style}>col-6</div>
          </Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row gutter={24}>
          <Col className="gutter-row" span={12}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div style={style}>col-6</div>
          </Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row gutter={24}>
          <Col className="gutter-row" span={12}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div style={style}>col-6</div>
          </Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row gutter={24}>
          <Col className="gutter-row" span={12}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div style={style}>col-6</div>
          </Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row gutter={24}>
          <Col className="gutter-row" span={12}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div style={style}>col-6</div>
          </Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row gutter={24}>
          <Col className="gutter-row" span={12}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div style={style}>col-6</div>
          </Col>
        </Row>
        <Divider orientation="left"></Divider>
        <Row gutter={24}>
          <Col className="gutter-row" span={12}>
            <div style={style}>col-6</div>
          </Col>
          <Col className="gutter-row" span={12}>
            <div style={style}>col-6</div>
          </Col>
        </Row>
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
    </div>
  );
};

export default ChatRoom;
