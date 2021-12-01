import React from 'react'
import { Layout } from 'antd';
import logo from './../../logo.svg'
import SideMenu from './SideMenu'
import RouterView from './../../router/RouterView'
import MainHeader from './MainHeader'
import { connect } from 'react-redux'

const { Sider, Content } = Layout;

// state => { return { collapsed: state.common.collapsed } }
// ({ common }) => ({ collapsed: common.collapsed })
// ({ common: { collapsed } }) => ({ collapsed: collapsed })
// ({ common: { collapsed } }) => ({ collapsed })

@connect(state => {
  return {
    collapsed: state.getIn(['common', 'collapsed'])
  }
})
class Index extends React.Component {
  

  render() {
    const { collapsed } = this.props

    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
              <img src={logo} style={{ height:'32px',width: '32px', margin: '0 10px 0 0 ' }} alt=""/>
              { collapsed ? null :  <span>JD_ADMIN</span>}
          </div>
          <SideMenu/>
        </Sider>
        <Layout className="site-layout">
          {/* <Header className="site-layout-background" style={{ padding: 0 }}>
            {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: this.toggle,
            })}
          </Header> */}
          <MainHeader/>
          <Content
            className="site-layout-background"
            style={{
              margin: '24px 16px',
              padding: 24,
              minHeight: 280,
              position: 'relative'
            }}
          >
            {/* 自定义的路由组件，类比vue中RouterView */}
           <RouterView/>
          </Content>
        </Layout>
      </Layout>
    );
  }
}


export default Index