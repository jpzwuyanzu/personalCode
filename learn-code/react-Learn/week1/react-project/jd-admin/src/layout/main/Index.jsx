import React  from 'react'
import { connect } from 'react-redux'
import { Layout } from 'antd';
import MainHeader from './MainHeader'
import logo from '../../logo.svg'
import SideMenu from './SideMenu'
import RouterView from '../../router/RouterView'

const {Sider, Content } = Layout;

@connect(state => {
  return {
    collapsed : state.getIn(['common', 'collapsed'])
  }
})
class Index extends React.Component {
  

  render() {
    const { collapsed } = this.props
    return (
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">
              <img src={logo} style={{ height: '32px',width:'32px',margin:'0 10px' }} alt=""/>
              {!collapsed ? <span>JD_AADMIN_PRO</span> : null}
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
              position:'relative'
            }}
          >
           <RouterView></RouterView>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Index