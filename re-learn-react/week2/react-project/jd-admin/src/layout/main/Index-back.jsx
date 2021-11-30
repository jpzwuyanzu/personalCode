import React, { Suspense, lazy } from 'react'
import { Layout, Spin } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import { Route, Switch } from 'react-router-dom'
import logo from './../../logo.svg'
import SideMenu from './SideMenu'
import menus from '../../router/menu'

const { Header, Sider, Content } = Layout;

class Index extends React.Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };


  renderRoute = (menus) => {
    return menus.map(item => {
      if(item.children) {
        return this.renderRoute(item.children)
      } else {
        return(
          <Route key={item.path} path={item.path}
          exact
          component = { item.component }></Route>
        )
      }
    })
  }

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo">
              <img src={logo} style={{ height:'32px',width: '32px', margin: '0 10px 0 0 ' }} alt=""/>
              { this.state.collapsed ? null :  <span>JD_ADMIN</span>}
          </div>
          <SideMenu/>
        </Sider>
        <Layout className="site-layout">
          <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              position: 'relative'
            }}
          >
            <Suspense fallback={<div className="loading"><Spin size="large" /> </div>}>
            <Switch>
            {
              this.renderRoute(menus)
            }
              {/* <Route path="/" exact component = { lazy(() => import('../../views/home/Index')) }></Route> */}
            </Switch>
            </Suspense>
          </Content>
        </Layout>
      </Layout>
    );
  }
}


export default Index