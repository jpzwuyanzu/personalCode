import React from 'react';
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import Breadcrumb from './Breadcrumb'
import { connect } from 'react-redux'
import * as types from './../../store/actionTypes'

const { Header } = Layout

const MainHeader = ({ collapsed, changeCollapsed, themeColor, changeThemeColor }) => {
    
    const  toggle = () => {
        changeCollapsed()
      };

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
            <div style={{ flex: 1 }}>
              <input type="color" onChange={ (e) => {
                // console.log(e.target.value)
                changeThemeColor(e.target.value)
              } } />
            </div>
          </Header>
    );
}

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
        }
    }))(MainHeader)
