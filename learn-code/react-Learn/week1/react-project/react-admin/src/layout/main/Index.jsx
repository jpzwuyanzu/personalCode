import React from "react";
import { connect } from "react-redux";
import { Layout } from "antd";
import logo from "../../logo.svg";
import Sidemenus from "./Sidemenus";
import MainHeader from "./MainHeader";
import RouteView from "../../router/RouteView";

const { Sider, Content } = Layout;

@connect((state) => {
  return {
    collapsed: state.getIn(["common", "collapsed"]),
  };
})
class Index extends React.Component {
  render() {
    const { collapsed } = this.props;
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
            <img
              src={logo}
              alt=""
              style={{ width: "32px", height: "32px", margin: "0 10px" }}
            />
            {!collapsed ? <span>React-Admin</span> : null}
          </div>
          <Sidemenus />
        </Sider>
        <Layout className="site-layout">
          <MainHeader />
          <Content
            className="site-layout-background"
            style={{
              margin: "24px 16px",
              padding: 24,
              minHeight: 280,
              position: "relative",
            }}
          >
            <RouteView></RouteView>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Index;
