import React from 'react';
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import SideMenu from './SideMenus'
import RouterView from './../../router/RouterView'
import logo from './../../logo.svg'

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

  render() {
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
            <div className="logo">
                <img src={ logo } style={{ height:'32px',width: '32px', margin: '0 10px 0 0 ' }}  alt=""/>
                { this.state.collapsed ? null : <span>react-mannage</span> }
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
              position:'relative'
            }}
          >
            <RouterView/>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Index
