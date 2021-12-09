import React, { useState, useEffect } from 'react';
import { Table, Image, Switch, Space, Button } from 'antd'

const SecKillList = () => {
    const [secKillList, setSecKillList] = useState([])
    useEffect(() => {
        if(sessionStorage.getItem('sort_product')) {
            const cacheArr = JSON.parse(sessionStorage.getItem('sort_product'))
            console.log(cacheArr)
            setSecKillList(cacheArr)
        }
    }, [])

    const columns = [
        {
            title: '序号',
            render: (text, record, index) => <span>{ index + 1 }</span>,
            align: 'center',
            fixed: 'left',
            width: 100
        },
        {
            title: '商品名称',
            dataIndex: 'proname',
            key: 'proname',
            align: 'center',
            fixed: 'left',
            width: 100
            
        },
        {
            title: '商品分类',
            dataIndex: 'categoryname',
            key: 'categoryname',
            align: 'center',
            width: 150
        },
        {
            title: '商品图片',
            dataIndex: 'img',
            width: 150,
            key: 'img',
            render: (text, record, index) => {
                return (
                    <Image src={ text } width={ 100 } height={ 100 } />
                )
            },
            align: 'center'
        },
        {
            title: '商品原价',
            dataIndex: 'originPrice',
            key: 'originPrice',
            align: 'center',
            width: 150,
            sorter: {
                compare: (a, b) => a.originPrice - b.originPrice,
                multiple: 1
            }
        },
        {
            title: '现售价',
            dataIndex: 'newPrice',
            key: 'newPrice',
            align: 'center',
            width: 150,
            sorter: {
                compare: (a, b) => a.newPrice - b.newPrice,
                multiple: 2
            }
        },
        {
            title: '商品描述',
            dataIndex: 'descri',
            key: 'descri',
            width: 500,
            align: 'center'
        },
        {
            title: '是否推荐',
            dataIndex: 'isRecommond',
            key: 'isRecommond',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (text, record, index) => {
                return(
                    <Switch defaultChecked={ text * 1 === 1 } disabled={ true } />
                )
            }
        },
        {
            title: '上架状态',
            dataIndex: 'isSale',
            key: 'isSale',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (text) => {
                return(
                    <Switch defaultChecked={ text * 1 === 1 } disabled={ true } />
                )
            }
        },
        {
            title: '是否秒杀',
            dataIndex: 'isKill',
            key: 'isKill',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (text, record, index) => {
                return <Switch defaultChecked={text * 1 === 1} onChange={(checked) => {
                    //在这里删除sort_list中对应项，并且修改admin_product的数据
                }}/>
            }
        },
        {
            title: '操作',
            fixed: 'right',
            width: 200,
            align: 'center',
            render: (text, record, index) => {
                return(
                    <Space>
                        <Button type="primary">编辑</Button>
                        <Button type="primary" danger>删除</Button>
                    </Space>
                )
            }
        }
    ]

    return (
        <>
        <Table rowKey="id"  dataSource={ secKillList } columns={ columns } scroll={{ y: 700, x: 1300 }} />
        </>
    );
}

export default SecKillList;
