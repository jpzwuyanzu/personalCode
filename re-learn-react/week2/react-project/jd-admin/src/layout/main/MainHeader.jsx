/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Layout, Menu, Dropdown } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined
} from '@ant-design/icons';
import * as types from './../../store/actionTypes'
import { connect } from 'react-redux'
import Breadcrumb from './Breadcrumb'
import { setItem } from './../../utils/common'

const { Header } = Layout

const MainHeader = ({ collapsed, changeCollapsed, color, adminname, changeColor, changeLoginState }) => {

    const toggle = () => {
        changeCollapsed()
    }

    const onClick = ({ key }) => {
      console.log(key)
      if(key === '2') {
        setItem('loginState', 'false')
        changeLoginState()
      }
    };
    
    const menu = (
      <Menu onClick={onClick}>
        <Menu.Item key="1">个人中心</Menu.Item>
        <Menu.Item key="2">退出登录</Menu.Item>
      </Menu>
    );

    return (
        <Header className="site-layout-background" style={{ padding: '0 16px',display: 'flex', backgroundColor: color  }}>
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
            <div style={{ flex: 1}}>
              <Breadcrumb/>
            </div>
            <div style={{ flex: 1 }}>
            <input type="color" onChange={ (e) => {
              console.log(e.target.value)
              changeColor(e.target.value)
            } } />
            </div>
            <div style={{ marginRight: '20px'}}>
            <Dropdown overlay={menu}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                用户名：{ adminname } <DownOutlined />
              </a>
            </Dropdown>
            </div>
          </Header>
    );
}

export default connect( state => ({
        collapsed: state.getIn(['common', 'collapsed']),
        color: state.getIn(['common', 'color']),
        adminname: state.getIn(['user', 'adminname'])
    }), dispatch => ({
        changeCollapsed() {
            dispatch({
                type: types.CHANGE_COLLAPSED
            })
        },
        changeColor(payload) {
          dispatch({
            type: types.CHANGE_COLOR,
            payload
          })
        },
        changeLoginState () {
          dispatch({
            type: types.CHANGE_LOGINSTATE,
            payload: false
          })
        }
    }) )(MainHeader);
