import React, { useEffect, useState } from 'react';
import { Table, Image, Button, Space } from 'antd'

const NavgatorList = () => {
    const [navlist, setNavList] = useState([])

    useEffect(() => {
        fetch('/navlist.json').then(res => res.json()).then(result => {
            // console.log(result)
            setNavList(result.result.data)
        })
    }, [])

    const columns = [
        {
            title: '序号',
            render: (text, record, index) => {
                return (
                    <span>{ index + 1 }</span>
                )
            }
        },
        {
            title: '分类',
            dataIndex: 'categoryname',
            key: 'categoryname'
        },
        {
            title: '分类',
            dataIndex: 'name',
            key: 'name'
        },
        {
            title: '分类图标',
            dataIndex: 'icon',
            key: 'icon',
            render: (text) => {
                return (
                    <Image src={ text } />
                )
            }
        },
        {
            title: '操作',
            render: (text) => {
                return (
                    <Space>
                        <Button type="primary" >编辑</Button>
                        <Button type="primary" >删除</Button>
                    </Space>
                )
            }
        }
    ]


    return (
       <>
        <Table rowKey={ record => record.navid } 
        dataSource={ navlist } columns={ columns } 
        scroll={{ y: 650 }} 
        />
       </>
    );
}

export default NavgatorList;
