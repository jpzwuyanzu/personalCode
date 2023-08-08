import { useState, useEffect, useRef } from "react";
import useWebSocket from '@/hooks/useWebSocket'
import { Input, Col, Divider, Row, Avatar, List, Dropdown, message} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import BScroll from '@better-scroll/core'
import MouseWheel from '@better-scroll/mouse-wheel'
BScroll.use(MouseWheel)

import styles from "./ChatRoom.module.scss";

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
  const [ws, wsData] = useWebSocket('ws://172.28.113.232:10086/webSocket',{})
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
  // 左侧用户列表选中项
  const [chatUserIndex, setChatUserIndex] = useState(-1);
  const [data, setData] = useState<UserItem[]>([]);
  //消息列表
  const messageList = [
    {
      name: 'tom',
      type: 0, 
      date: '2023-07-24',
      messageType: 0,
      message: '这是消息001',
      id: 1
    },
    {
      name: 'tom',
      type: 0, 
      date: '2023-07-24',
      messageType: 0,
      message: '这是消息002',
      id: 2
    },
    {
      name: 'tom',
      type: 0, 
      date: '2023-07-24',
      messageType: 0,
      message: '这是消息003',
      id: 3
    },
    {
      name: 'tom',
      type: 0, 
      date: '2023-07-24',
      messageType: 0,
      message: '这是消息004',
      id: 4
    },
    {
      name: 'tom',
      type: 0, 
      date: '2023-07-24',
      messageType: 0,
      message: '这是消息005',
      id: 5
    },
    {
      name: 'tom',
      type: 0, 
      date: '2023-07-24',
      messageType: 0,
      message: '这是消息006',
      id: 6
    },
    {
      name: 'tom',
      type: 0, 
      date: '2023-07-24',
      messageType: 0,
      message: '这是消息007',
      id: 7
    },
    {
      name: 'tom',
      type: 0, 
      date: '2023-07-24',
      messageType: 0,
      message: '这是消息008',
      id: 8
    },
    {
      name: 'tom',
      type: 0, 
      date: '2023-07-24',
      messageType: 0,
      message: '这是消息009',
      id: 9
    },
    {
      name: 'tom',
      type: 0, 
      date: '2023-07-24',
      messageType: 0,
      message: '这是消息010',
      id: 10
    },
    {
      name: 'tom',
      type: 0, 
      date: '2023-07-24',
      messageType: 0,
      message: '这是消息011',
      id: 11
    },
    {
      name: 'tom',
      type: 0, 
      date: '2023-07-24',
      messageType: 0,
      message: '这是消息012',
      id: 12
    },
    {
      name: 'tom',
      type: 0, 
      date: '2023-07-24',
      messageType: 0,
      message: '这是消息013',
      id: 13
    },
    {
      name: 'tom',
      type: 0, 
      date: '2023-07-24',
      messageType: 0,
      message: '这是消息014',
      id: 14
    },
    {
      name: 'tom',
      type: 0, 
      date: '2023-07-24',
      messageType: 0,
      message: '这是消息015',
      id: 15
    }
  ]

  useEffect(() => {
    let scroll = new BScroll((scrollWrapperRef.current as any), {
      mouseWheel: true
    })
  }, [])

  useEffect(() => {
    console.log('webSocket message:', wsData)
  }, [wsData])
  


  return (
    <div className={styles.chatRoom_container}>
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
        <div ref={ scrollWrapperRef } className={styles.message_wrapper}>
          <div className={styles.message_content}>
            {
              messageList && messageList.map((itm) => (
                <div className={styles.messageList_item} key={itm.id}>{ itm.message }</div>
              ))
            }
          </div>
        </div>
        <div className={styles.send_message}>
          <Dropdown menu={{ items }} placement="topLeft" arrow>
            <div className={styles.fastMessage}></div>
          </Dropdown>
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
    </div>
  );
};

export default ChatRoom;
