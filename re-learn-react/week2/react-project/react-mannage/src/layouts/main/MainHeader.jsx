import React from 'react';
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons';
import { connect } from 'react-redux'
import * as types from './../../store/actionTypes'

const { Header } = Layout

const MainHeader = ({ collapsed, changeCollapsed }) => {
    
    const  toggle = () => {
        changeCollapsed()
      };

    return (
        <Header className="site-layout-background" style={{ padding: 0 }}>
            {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })} */}
            {
               collapsed ?  
               <MenuUnfoldOutlined className="trigger" onClick={ toggle } /> 
               : 
               <MenuFoldOutlined className="trigger" onClick={ toggle } />
            }
          </Header>
    );
}

export default connect(state => ({
    collapsed: state.getIn(['common', 'collapsed'])
}), dispatch => ({
        changeCollapsed () {
            dispatch({
                type: types.CHANGE_COLLAPSED
            })
        }
    }))(MainHeader)
