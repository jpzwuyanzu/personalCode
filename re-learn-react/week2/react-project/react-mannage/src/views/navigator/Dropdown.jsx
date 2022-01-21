/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import { Divider, Menu, Dropdown } from 'antd'
import { DownOutlined } from '@ant-design/icons'

const DropdownCom = () => {
    const menu = (<Menu>
        <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
            1st menu item
        </a>
        </Menu.Item>
        <Menu.Item icon={<DownOutlined />} disabled>
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
            2nd menu item (disabled)
        </a>
        </Menu.Item>
        <Menu.Item disabled>
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
            3rd menu item (disabled)
        </a>
        </Menu.Item>
        <Menu.Item danger>a danger item</Menu.Item>
        </Menu>)
    return (
        <div>
            <h1>DropDown下拉菜单</h1>
            <Divider/>
            <Dropdown overlay={menu}>
                <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                Hover me <DownOutlined />
                </a>
            </Dropdown>
        </div>
    );
}

export default DropdownCom;
