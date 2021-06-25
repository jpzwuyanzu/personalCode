/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { connect } from "react-redux";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
} from "@ant-design/icons";
import { Layout, Dropdown, Menu } from "antd";
import BreadCrumb from "./Breadcrumb";
import { setItem } from "./../../utils/common";

import * as types from "../../store/actiontypes";

const { Header } = Layout;

const MainHeader = ({
  collapsed,
  changeCollapsed,
  color,
  changeColor,
  adminname,
  changeLoginState,
}) => {


  const toggle = () => {
    changeCollapsed();
  };
  const handleClick = (item) => {
    if (item.key === "3") {
      changeLoginState();
    }
  };

  const menu = (
    <Menu onClick={handleClick}>
      <Menu.Item key="0">个人中心</Menu.Item>
      <Menu.Item key="3">退出</Menu.Item>
    </Menu>
  );

  return (
    <Header
      className="site-layout-background"
      style={{ padding: "0 16px", display: "flex", backgroundColor: color }}
    >
      {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })} */}
      <div style={{ width: "50px" }}>
        {collapsed ? (
          <MenuUnfoldOutlined
            style={{ fontSize: "24px", marginTop: "20px" }}
            className="trigger"
            onClick={toggle}
          />
        ) : (
          <MenuFoldOutlined
            style={{ fontSize: "24px", marginTop: "20px" }}
            className="trigger"
            onClick={toggle}
          />
        )}
      </div>
      <div style={{ flex: 1 }}>
        <BreadCrumb />
      </div>
      <div style={{ flex: 1 }}>
        <input
          type="color"
          onChange={(e) => {
            console.log(e.target.value);
            changeColor(e.target.value);
          }}
        />
      </div>
      <div style={{ flex: 1, textAlign: "right", paddingRight: "20px" }}>
        <Dropdown overlay={menu} trigger={["click"]}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            欢迎您，{adminname} <DownOutlined />
          </a>
        </Dropdown>
      </div>
    </Header>
  );
};

export default connect(
  (state) => ({
    collapsed: state.getIn(["common", "collapsed"]),
    color: state.getIn(["common", "color"]),
    adminname: state.getIn(["user", "adminname"]),
  }),
  (dispatch) => ({
    changeCollapsed() {
      dispatch({
        type: types.CHANGE_CPLLAPSED,
      });
    },
    changeColor(params) {
      dispatch({
        type: types.CHANGE_COLOR,
        payload: params,
      });
    },
    changeLoginState() {
      dispatch({
        type: "CHANGE_LOGIN_STATE",
        payload: false,
      });
      setItem("loginState", "false");
    },
  })
)(MainHeader);
