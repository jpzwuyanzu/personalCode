import React, { useState } from 'react';
import { Table, Button, Drawer, Form, Input, Select, Tree } from 'antd'
import menus from './../../router/menu'

// function  getMenu (menus) {
//     const arr  = []
//     menus.forEach(item => {
//         let childrenarr = []
//         if(item.children) {
//             childrenarr = getMenu(item.children)
//         }
//         item.key = item.path
//         item.childrenarr && (item.children = childrenarr)
//        !(item.meta && item.meta.hidden) && arr.push(item)
//     })
//     return arr
// }

menus.splice(0, 1) //过滤重定向的第一项

const treeData = menus

const AdminList = () => {
    const [adminlist, setAdminList] = useState([])
    const [visible, setVisiable] = useState(false)

    const [adminname, setAdminName] = useState('')
    const [password, setPassWord] = useState('')
    const [role, setRole] = useState(1)
    const [checkedKeys, setCheckedKeys] = useState([])


    const columns = []

    const addAdmin = () => {
        let params = {
            "adminname": adminname,
            "password": password,
            "role": role,
            "checkedKeys": checkedKeys,
        }
        console.log(params)
        //在这里调用添加管理员的接口
    }
   

    return (
       <>
        <Button type="primary" onClick={ () => setVisiable(true) } style={{ marginBottom: 20 }}>添加管理员</Button>
        <Table 
        dataSource={ adminlist } 
        columns={ columns } 
        rowKey = 'adminid'
        />
        <Drawer 
           closable={ true }
            title="添加管理员" 
            placement="right" 
            width='500' 
            
            onClose={() => setVisiable(false)} 
            visible={visible}
            footer={
                <div style={{ textAlign: 'right' }}>
                    <Button type="primary" danger style={{ marginRight: 8 }}>取消</Button>
                    <Button type="primary" onClick={ addAdmin  }>添加</Button>
                </div>
            }
        >
        <Form>
            <Form.Item 
            name="adminname"
            rules={[{
                required: true,
                message: '请输入管理员账号'
            }]}>
                <Input placeholder="请输入管理员账号" onChange={ (e) => setAdminName(e.target.value) }></Input>
            </Form.Item>
            <Form.Item 
            name="password"
            rules={[{
                    required: true,
                    message: '请输入管理员密码'
                }]}>
                <Input.Password placeholder="请输入管理员密码" onChange={ (e) => setPassWord(e.target.value) }/>
            </Form.Item>
            <Form.Item 
            name="role">
                <Select onChange={ (value) => setRole(value) }>
                    <Select.Option value={ 2 }>超级管理员</Select.Option>
                    <Select.Option value={ 1 }>管理员</Select.Option>
                </Select>
            </Form.Item>
        </Form>
        {/* 树形菜单 */}
        <Tree
        // defaultExpandedKeys={['0-0-0', '0-0-1']}
        defaultExpandAll={ true }
        // defaultSelectedKeys={['/home', '/bannermanager/list']}
        // defaultCheckedKeys={['/home', '/bannermanager/list']}
        checkable
        treeData={treeData}
        onSelect={(selectedKeys, info) => {
            // console.log('selected', selectedKeys, info)
        }}
        onCheck={(checkedKeys, info) => {
            console.log('checked', checkedKeys, info)
            setCheckedKeys(info.checkedNodes)
        }}/>
      </Drawer>
       </>
    );
}

export default AdminList;
