import React, { useState, useEffect } from 'react';
import { 
    Table,
    Button,
    Drawer,
    Form,
    Input,
    Select,
    Tree,
    Space,
    Tag,
    Modal
} from 'antd'
import { loadAdminList } from './../../api/admin'
import menus from './../../router/menu'

menus.splice(0, 1) //过滤重定向的第一项

const treeData = menus

const AdminList = () => {
    const [adminlist, setAdminList] = useState([])
    useEffect(() => {
        loadAdminList({}).then(res => {
            // console.log(res)
            setAdminList(res.data.result)
        })
    }, [])
    const [visible, setVisiable] = useState(false)
    const [adminname, setAdminName] = useState('')
    const [password, setPassWord] = useState('')
    const [role, setRole] = useState(1)
    const [checkedKeys, setCheckedKeys] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    
    const columns = [
        {
            title: "序号",
            render:(text, record, index) => <span>{ index }</span>
        },
        {
            title: '管理员名称',
            dataIndex: 'adminname',
            key: 'adminname'
        },
        {
            title: '管理员角色',
            dataIndex: 'roleid',
            key: 'roleid',
            render: (text, record, index) => <Tag color="magenta">{ text === 1 ? '普通管理员' : '超级管理员' }</Tag>
        },
        {
            title: "操作",
            render: (text, record, index) => {
                return (
                    <>
                     <Space>
                         <Button type="primary" onClick={ () => editAdmin(record) }>编辑</Button>
                         <Button type="dashed" danger>删除</Button>
                     </Space>
                    </>
                )
            }
        }
    ]
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
    const editAdmin = (record) => {
        setAdminName(record.adminname)
        setRole(record.roleid)
        setModalVisible(true)
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
            // console.log('checked', checkedKeys, info)
            setCheckedKeys(info.checkedNodes)
        }}/>
      </Drawer>
        {/* 编辑管理员 */}
        <Modal title="Basic Modal" 
        visible={modalVisible} 
        onOk={() => {
            setModalVisible(false)
        }} 
        onCancel={() => {
            setModalVisible(false)
        }}>
        <Form>
            <Form.Item>
                <Input value={ adminname }  placeholder="请输入管理员账号" onChange={ (e) => setAdminName(e.target.value) }></Input>
            </Form.Item>
            <Form.Item>
                <Select value={ role } onChange={ (value) => setRole(value) }>
                    <Select.Option value={ 2 }>超级管理员</Select.Option>
                    <Select.Option value={ 1 }>管理员</Select.Option>
                </Select>
            </Form.Item>
        </Form>
      </Modal>
       </>
    );
}

export default AdminList;
