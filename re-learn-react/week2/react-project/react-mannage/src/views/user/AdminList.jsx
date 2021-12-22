/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Table, Button, Drawer, Form, Input, Select, Tree } from 'antd'
import menus from './../../router/menu'

menus.splice(0, 1)


const AdminList = () => {
    const [adminlist, setAdminList] = useState([])
    const [adminname, setAdminName] = useState('')
    const [password, setPassWord] = useState('')
    const [checkedKeys, setCheckedKeys] = useState([])
    const [role, setRole] = useState('')
    const [visible, setVisible] = useState(false)
    const [form] = Form.useForm()
    const columns = []

    useEffect(() => {
        if(visible) {
            form.validateFields(adminname)
        }
    }, [visible])

    const submitForm = () => {
        let params = {
            'adminname': adminname,
            'password': password,
            'role': role
        }
        console.log(params)
        console.log(checkedKeys)
    }




    return (
        <>
        <Button type="primary" onClick={ () => setVisible(true) } style={{ marginBottom: 20 }}>添加管理员</Button>
        <Table dataSource={ adminlist } columns={ columns } />
        <Drawer 
            getContainer={false}
            title="添加管理员" 
            width={ 500 }
            placement="right" 
            onClose={ () => setVisible(false)} 
            visible={visible}
            footer={
                <div style={{ textAlign: 'right' }}>
                    <Button type="primary" danger style={{ marginRight: 10 }} onClick={ () => setVisible(false) }>取消</Button>
                    <Button type="primary" onClick={ submitForm }>添加</Button>
                </div>
            }>
            <Form form={form}>
                <Form.Item 
                  name="adminname"
                  label="管理员名称"
                  rules={[{
                      required: true,
                      message: '请输入管理员名称！'
                  }]}
                >
                    <Input placeholder="请输入管理员名称" onChange={ (e) => setAdminName(e.target.value) }></Input>
                </Form.Item>
                <Form.Item 
                  name="password"
                  label="管理员密码"
                  rules={[{
                      required: true,
                      message: '请输入管理员密码！'
                  }]}
                >
                    <Input.Password placeholder="请输入管理员密码"  onChange={ (e) => setPassWord(e.target.value) }></Input.Password>
                </Form.Item>
                <Form.Item 
                  name="role"
                  label="管理员角色"
                  rules={[{
                      required: true
                  }]}
                >
                    <Select onChange={ (e) => setRole(e) }>
                        <Select.Option value={ 1 }>管理员</Select.Option>
                        <Select.Option value={ 2 }>超级管理员</Select.Option>
                    </Select>
                </Form.Item>
                {/* 树形结构 */}
                <Form.Item
                  label="角色权限"
                  >
                   <Tree
                        checkable
                        defaultExpandAll={ true }
                        onCheck={ (checkedKeys, e) => {
                            setCheckedKeys(checkedKeys)
                            // console.log(checkedKeys)
                            // console.log('-------')
                            // console.log(e) //这里如果是半选状态，需要注意halfCheckedKeys
                        } }
                        checkedKeys={checkedKeys}
                        treeData={menus}
                    />
                </Form.Item>
            </Form>
        </Drawer>
        </>
    );
}

export default AdminList;
