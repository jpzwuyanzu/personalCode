import React, { useEffect, useState } from 'react'
import { Table, Space, Button, Modal } from 'antd';
import axios from 'axios'
import {
    EditOutlined,
    DeleteOutlined,
    ExclamationCircleOutlined
} from "@ant-design/icons";
import { render } from '@testing-library/react';

const RightList = () => {

    const [dataSource, setDataSource] = useState([])
    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id',
          render: (text: any) => {
              return <b>{ text }</b>
          }
        },
        {
          title: '权限名称',
          dataIndex: 'label',
          key: 'label',
        },
        {
          title: '权限路径',
          dataIndex: 'key',
          key: 'key',
        },
        {
            title: '操作',
            render: (text: any) => {
                return <Space>
                    <Button type="primary" shape="circle" icon={<EditOutlined />} />
                    <Button danger shape="circle" icon={<DeleteOutlined />} onClick={ () => showModal() } />
                </Space>
            }
        }
      ];

    useEffect(() => {
        axios.get('http://localhost:3000/rights?_embed=children').then(res => {
            console.log(res.data)
            const list = res.data
            list[0].children = '';
            setDataSource(res.data)
        })
    },[])
    const showModal = () => {
        Modal.confirm({
            title: 'Confirm',
            icon: <ExclamationCircleOutlined />,
            content: '确认删除该权限吗？',
            okText: '确认',
            cancelText: '取消',
            onOk: () => {
                confirmDelete()
            }
          });
    }
    const confirmDelete = () => {
        console.log('确认删除')
    }

    return (
        <div>
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 10 }}/>
        </div>
    )
}

export default RightList
