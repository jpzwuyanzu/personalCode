import React, { useState, useEffect } from 'react'
import { Table, Button, Drawer, Tree, Space } from 'antd'
import axios from 'axios'

const RoleList = () => {
    const [dataSource, setDataSource] = useState([]);
    const [open, setOpen] = useState(false);
    const [treeData, setTreeData] = useState([]);
    const [checkedList, setCheckList] = useState([]);
    const columns: any = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
            align: 'center'
        },
        {
            title: '角色名称',
            dataIndex: 'roleName',
            key: 'roleName',
            align: 'center'
        },
        {
            title: '操作',
            render: (text: any, record: any) => {
              return   <Button type="primary" onClick={ () => showDrawer(text) }>权限</Button>
            },
            align: 'center'
        }
    ]
    const showDrawer = (record: any) => {
        dataSource.forEach((item: any) => {
            if(item.id === record.id ) {
                setCheckList(item.rights)
            }
        })
        setOpen(true);
    };

    const onClose = () => {
        setOpen(false);
    };
    const checkNow = (checkedKeys: any) => {
        setCheckList(checkedKeys)
        // 在这里向后端发起请求
    }
    useEffect(() => {
        axios.get('role.json').then(res => {
            setDataSource(res.data.roles)
        })
        axios.get('right.json').then(res => {
            setTreeData(res.data.rights)
        })
    }, [])
    return (
       <div>
        <Table dataSource={dataSource} columns={ columns } rowKey={ (record: any) => record.id }/>
        <Drawer title="权限" placement="right" onClose={onClose} open={open} extra={
          <Space>
            <Button>取消</Button>
            <Button type="primary">
              确定
            </Button>
          </Space>
        }>
            <Tree checkable checkedKeys={ checkedList } treeData={ treeData } onCheck={ checkNow }/>
        </Drawer>
       </div>
    )
}

export default RoleList
