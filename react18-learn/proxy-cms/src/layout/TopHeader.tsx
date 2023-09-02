import { useEffect, useState } from 'react'
import { Layout, Button, theme, message, Dropdown, Space, Badge } from "antd";
import { BellOutlined } from '@ant-design/icons'
import { respMessage } from '@/utils/message'
import { useNavigate } from "react-router-dom";
import { switchCollapsed } from "./../store/slices/collapse.slice";
import { useAppDispatch, useAppSelector } from "./../hooks/hooks";
import useWebSocket from "@/hooks/useWebSocket";
import ResetPassModal from '@/components/ResetPassModal'
import ChatRoomIndex from '@/components/ChatRoom/ChatRoomIndex'
import CusColor from '@/components/CusColor';
import styles from "./TopHeader.module.scss";
import {
  LoginOutlined,
  SettingOutlined,
  UserOutlined,
  MenuFoldOutlined, 
  MenuUnfoldOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { loginOut, loadCusList } from "./../api/index";

const { Header } = Layout;

export default function TopHeader() {
  const [createWebSocket, ws, wsData] = useWebSocket(`ws://172.28.113.248:10086/webSocket`,{});
  const collapsed = useAppSelector((state) => state.collapse.status);
  const userInfo = useAppSelector((state) => state.user.userInfo)
  const cusColor = useAppSelector((state) => state.cusColor.color)
  const {token: { colorBgContainer }} = theme.useToken();
  const [unReadNum, setUnReadNum] = useState<any>(0);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  //重置密码
  const [modalStatus, setModalStatus] = useState(false); 
  //聊天室
  const [chatRoomStatus, setChatRoomStatus] = useState(false);
  // 退出登录
  const loginOutNow = async () => {
    const resp: any = await loginOut();
    if (resp.code && resp.code === 200) {
      localStorage.clear();
      sessionStorage.clear()
      navigate("/login");
      message.open({
        type: "success",
        content: "退出登录",
      });
    } else {
      message.open({
        type: "error",
        content: respMessage[String(resp.payload.code)],
      });
    }
  };
  //关闭修改密码
  const closeModal = () => {
    setModalStatus(false)
  }
  //打开聊天室
  const openChatRoom = async() => {
    const res: any = await loadCusList({})
    console.log(res)
    if(res && res.code === 200) {
      if(res.data.chat.length) {
        setChatRoomStatus(true)
      } else {
        message.open({
          type: "success",
          content: "暂无联系人",
          className: "custom-class",
          style: {
            marginTop: "20vh",
            fontSize: "20px",
          },
        });
      }
      
    } 
  }
  //关闭聊天室
  const closeChatRoom =async () => {
    setChatRoomStatus(false)
  }
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div className={styles.dropDown_Items}>个人中心</div>,
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: <div className={styles.dropDown_Items} onClick={() => setModalStatus(true)}>修改密码</div>,
      icon: <SettingOutlined />,
    },
    {
      type: "divider",
    },
    {
      key: "3",
      label: (
        <div className={styles.dropDown_Items} onClick={() => loginOutNow()}>
          退出登录
        </div>
      ),
      icon: <LoginOutlined />,
    },
  ];


  useEffect(() => {
    if (wsData && wsData.msgId && wsData.type) {
      console.log(wsData)
      setUnReadNum(unReadNum+1)
    }
  }, [wsData])


  return (
    <>
      {/* <Header style={{ padding: 0, background: colorBgContainer }}> */}
      <Header style={{ padding: 0 }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => dispatch(switchCollapsed())}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
            color: `${cusColor}`
          }}
        />
        <div className={styles.user_head_container}>
          <Space>
            <CusColor/>
            {
              userInfo.userType === 1 ?  <div className={ styles.ring_container }  onClick={() => openChatRoom()}><Badge count={(unReadNum as any)}>
              <BellOutlined  className={ styles.messageTips } style={{ color: 'white' }} />
           </Badge> </div>: null
            }
          </Space>
          <Dropdown menu={{ items }} placement="bottom">
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <span className={styles.user_head}>
                  <img
                    className={styles.user_Img}
                    src={ userInfo.fastUrl+ userInfo.headImage}
                    alt=""
                    style={{ borderRadius: '50%' }}
                  />
                  <span className={styles.user_Name}>{ userInfo.name }</span>
                </span>
              </Space>
            </a>
          </Dropdown>
        </div>
        <ResetPassModal open={modalStatus} userInfo={userInfo} closeModal={closeModal} isTop={true}/>
        <ChatRoomIndex open={chatRoomStatus} closeChatRoom={closeChatRoom}  />
      </Header>
    </>
  );
}
