import React, { useState } from 'react';
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import * as types from './../../store/actionTypes'
import { connect } from 'react-redux'
const { Header } = Layout

const MainHeader = ({ collapsed, changeCollapsed }) => {
    
    // const [collapsed, setCollapsed] = useState(false)

    const toggle = () => {
        changeCollapsed()
    }

    return (
        <Header className="site-layout-background" style={{ padding: '0 16px',  }}>
            {/* {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
              className: 'trigger',
              onClick: toggle,
            })} */}
            {
               collapsed ?  
               <MenuUnfoldOutlined style={{ fontSize: '24px' }} className="trigger" onClick={ toggle } />
                : 
               <MenuFoldOutlined style={{ fontSize: '24px' }} className="trigger" onClick={ toggle } />
            }
          </Header>
    );
}

export default connect( state => ({
        collapsed: state.getIn(['common', 'collapsed'])
    }), dispatch => ({
        changeCollapsed() {
            dispatch({
                type: types.CHANGE_COLLAPSED
            })
        }
    }) )(MainHeader);
