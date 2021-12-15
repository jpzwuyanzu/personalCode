/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import Breadcrumb from './Breadcrumb'
import { connect } from 'react-redux'
import * as types from './../../store/actionTypes'
import { setItem } from './../../utils/common'
import userIcon from './../../github-logo.png'
import { withRouter } from 'react-router-dom'

const { Header } = Layout

const MainHeader = withRouter(({ collapsed, changeCollapsed, themeColor, changeThemeColor, changeLoginState, history }) => {
    
    const  toggle = () => {
        changeCollapsed()
      };
      const onClick = ({ key }) => {
        if(key === '2') {
          setItem('loginState', 'false')
          changeLoginState()
        } else {
          history.push('/userCenter')
        }
      };
      
      const menu = (
        <Menu onClick={onClick}>
          <Menu.Item key="1">个人中心</Menu.Item>
          <Menu.Item key="2">退出登录</Menu.Item>
        </Menu>
      );
      

    return (
        <Header className="site-layout-background" style={{ padding: '0 16px', display: 'flex', backgroundColor: themeColor }}>
            {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })} */}
            <div style={{ width: '50px' }}>
            {
               collapsed ?  
               <MenuUnfoldOutlined style={{ fontSize: '24px', marginTop: '20px' }} className="trigger" onClick={ toggle } /> 
               : 
               <MenuFoldOutlined style={{ fontSize: '24px', marginTop: '20px' }} className="trigger" onClick={ toggle } />
            }
            </div>
            <div style={{ flex: 1 }}>
              <Breadcrumb/>
            </div>
            {/* <div style={{ flex: 1 }}>
              <input type="color" onChange={ (e) => {
                // console.log(e.target.value)
                changeThemeColor(e.target.value)
              } } />
            </div> */}
            <div style={{ marginRight: 30 }}>
            <Dropdown overlay={menu} placement="bottomCenter">
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
              <img style={{ width: 30, height: 30, marginRight: 10 }} src={ userIcon } alt=""/>
              </a>
            </Dropdown>
            </div>
          </Header>
    );
})

export default connect(state => ({
    collapsed: state.getIn(['common', 'collapsed']),
    themeColor: state.getIn(['common', 'themeColor'])
}), dispatch => ({
        changeCollapsed () {
            dispatch({
                type: types.CHANGE_COLLAPSED
            })
        },
        changeThemeColor (payload) {
          dispatch({
            type: types.CHANGE_THEME_COLOR,
            payload
          })
        },
        changeLoginState () {
          console.log('90')
          dispatch({
            type: types.CHANGE_LOGIN_STATE,
            payload: 'false'
          })
        }
    }))(MainHeader)
