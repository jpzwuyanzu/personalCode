import { Layout, Button, theme, message, Dropdown, Space } from "antd";
import { useNavigate } from "react-router-dom";
import { switchCollapsed } from "./../store/slices/collapse.slice";
import { useAppDispatch, useAppSelector } from "./../hooks/hooks";
import styles from "./TopHeader.module.scss";
import {
  LoginOutlined,
  SettingOutlined,
  UserOutlined,
  MenuFoldOutlined, 
  MenuUnfoldOutlined
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { loginOut } from "./../api/index";

const { Header } = Layout;

export default function TopHeader() {
  const collapsed = useAppSelector((state) => state.collapse.status);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginOutNow = async () => {
    const resp: any = await loginOut();
    console.log(resp);
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
        content: resp.payload.msg,
      });
    }
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <div className={styles.dropDown_Items}>个人中心</div>,
      icon: <UserOutlined />,
    },
    {
      key: "2",
      label: <div className={styles.dropDown_Items}>个人设置</div>,
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
  return (
    <>
      <Header style={{ padding: 0, background: colorBgContainer }}>
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => dispatch(switchCollapsed())}
          style={{
            fontSize: "16px",
            width: 64,
            height: 64,
          }}
        />
        <div className={styles.user_head_container}>
          <Dropdown menu={{ items }} placement="bottom">
            <a onClick={(e) => e.preventDefault()}>
              <Space>
                <span className={styles.user_head}>
                  <img
                    className={styles.user_Img}
                    src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
                    alt=""
                  />
                  <span className={styles.user_Name}>Serati Ma</span>
                </span>
              </Space>
            </a>
          </Dropdown>
        </div>
      </Header>
    </>
  );
}
