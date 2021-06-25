/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { connect } from "react-redux";
import { Layout, Dropdown, Menu } from "antd";
import BreadCrumb from "./Breadcrumb";
import { setItem } from '../../utils/common'
import { MenuUnfoldOutlined, MenuFoldOutlined, DownOutlined,LogoutOutlined ,UserOutlined} from "@ant-design/icons";
const { Header } = Layout;

const MainHeader = ({ collapsed, changeCollapsed, adminName, changeLoginState }) => {
  
  const toggle = () => {
    changeCollapsed();
  };
  
  const handleClick = (item) => {
    if(item.key === '1') {
      changeLoginState()
    }
  }

  const menu = (
    <Menu onClick={handleClick}>
      <Menu.Item key="0"><UserOutlined />个人中心</Menu.Item>
      <Menu.Item key="1"><LogoutOutlined />退出</Menu.Item>
    </Menu>
  )

  return (
    <Header
      className="site-layout-background"
      style={{ padding: "0 16px", display: "flex" }}
    >
      <div style={{ width: "50px" }}>
        {collapsed ? (
          <MenuUnfoldOutlined
            className="trigger"
            style={{ fontSize: "24px", marginTop: "20px" }}
            onClick={toggle}
          />
        ) : (
          <MenuFoldOutlined
            className="trigger"
            style={{ fontSize: "24px", marginTop: "20px" }}
            onClick={toggle}
          />
        )}
      </div>
      <div style={{ flex: 1 }}>
        <BreadCrumb></BreadCrumb>
      </div>
      <div style={{ flex:1,textAlign:'right',marginRight:'20px' }}>
      <Dropdown overlay={menu}>
      <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
       欢迎您，{adminName} <DownOutlined />
      </a>
    </Dropdown>
      </div>
    </Header>
  );
};

export default connect(
  (state) => ({
    collapsed: state.getIn(["common", "collapsed"]),
    adminName: state.getIn(['user','adminName'])
  }),
  (dispatch) => ({
    changeCollapsed() {
      dispatch({
        type: "CHANGE_COLLAPSED",
      });
    },
    changeLoginState() {
      dispatch({
        type:'CHANGE_LOGINSTATE',
        payload: false
      })
      setItem('loginState', false)
    }
  })
)(MainHeader);
