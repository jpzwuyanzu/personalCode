import React from 'react';
import { Layout } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
} from '@ant-design/icons';
import * as types from './../../store/actionTypes'
import { connect } from 'react-redux'
import Breadcrumb from './Breadcrumb'

const { Header } = Layout

const MainHeader = ({ collapsed, changeCollapsed }) => {

    const toggle = () => {
        changeCollapsed()
    }

    return (
        <Header className="site-layout-background" style={{ padding: '0 16px',display: 'flex'  }}>
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
