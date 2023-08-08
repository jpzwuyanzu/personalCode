import { useState, useEffect } from "react";
import { Input, Col, Divider, Row, Avatar, List, Dropdown, message} from "antd";
import { SearchOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import VirtualList from 'rc-virtual-list'

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

const fakeDataUrl =
  'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 400;


const ChatRoom = () => {
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

  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
        // message.success(`${body.results.length} more items loaded!`);
      });
  };

  useEffect(() => {
    appendData();
  }, []);

  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (e.currentTarget.scrollHeight - e.currentTarget.scrollTop === ContainerHeight) {
      appendData();
    }
  };

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
        <div className={styles.message_content}>
        <List bordered={ false } itemLayout="horizontal">
            <VirtualList
              data={data}
              height={ContainerHeight}
              itemHeight={47}
              itemKey="email"
              onScroll={onScroll}
            >
              {(item: UserItem) => (
                <List.Item key={item.email}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.picture.large} />}
                    title={<a href="https://ant.design">{item.name.last}</a>}
                    description={item.email}
                  />
                  <div key={item.email}>Content</div>
                </List.Item>
              )}
            </VirtualList>
          </List>
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
