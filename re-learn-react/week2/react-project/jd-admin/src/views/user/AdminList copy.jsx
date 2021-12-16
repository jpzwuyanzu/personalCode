import React, { useState } from 'react';
import { Table, Button, Drawer, Form, Input, Select } from 'antd'

const AdminList = () => {
    const [adminlist, setAdminList] = useState([])
    const [visible, setVisiable] = useState(false)
    const columns = []

    const finish = (values) => {
        console.log(values)
    }

    return (
       <>
        <Button type="primary" onClick={ () => setVisiable(true) } style={{ marginBottom: 20 }}>添加管理员</Button>
        <Table 
        dataSource={ adminlist } 
        columns={ columns } 
        rowKey = 'adminid'
        />
        <Drawer title="Basic Drawer" placement="right" width='500' onClose={() => setVisiable(false)} visible={visible}>
        <Form 
         onFinish={ finish }
         initialValues={{
             role: 1
         }}
        >
            <Form.Item 
            name="adminname"
            rules={[{
                required: true,
                message: '请输入管理员账号'
            }]}
            >
                <Input placeholder="请输入管理员账号"></Input>
            </Form.Item>
            <Form.Item 
            name="password"
            rules={[{
                    required: true,
                    message: '请输入管理员密码'
                }]}
            >
                <Input.Password placeholder="请输入管理员密码"/>
            </Form.Item>
            <Form.Item 
            name="role">
                <Select>
                    <Select.Option value={ 2 }>超级管理员</Select.Option>
                    <Select.Option value={ 1 }>管理员</Select.Option>
                </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit">添加</Button>
        </Form>
      </Drawer>
       </>
    );
}

export default AdminList;
