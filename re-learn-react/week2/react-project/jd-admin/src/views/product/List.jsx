import React, { useState, useEffect } from 'react';
import { Table, Image, Switch, Space, Button, Pagination } from 'antd'

const List = () => {

    const [productList, setProductList] = useState([])
    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(0)
    const [pageSize, setPageSize] = useState(10)

    useEffect(() => {
        if(sessionStorage.getItem('admin_product')) {
            console.log('222')
            const cacheArr = JSON.parse(sessionStorage.getItem('admin_product'))
            setProductList(cacheArr)
            setTotal(cacheArr.length)
        } else {
            fetch('/product.json').then(res => res.json()).then(result => {
                sessionStorage.setItem('admin_product', JSON.stringify(result.result))
                setProductList(result.result)
                setTotal(result.result.length)
            })
        }
    }, []);

    const columns = [
        {
            title: '序号',
            render: (text, record, index) => <span>{ (current - 1) * pageSize + index + 1 }</span>,
            align: 'center',
            fixed: 'left',
            width: 150
        },
        {
            title: '商品名称',
            dataIndex: 'proname',
            key: 'proname',
            align: 'center',
            fixed: 'left',
            width: 150
            
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
        },
        {
            title: '现售价',
            dataIndex: 'newPrice',
            key: 'newPrice',
            align: 'center',
            width: 150
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
                    console.log(checked)
                    const arr = productList
                    arr[index].isKill = checked
                    sessionStorage.setItem('admin_product', JSON.stringify(arr))
                    setProductList(arr)
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

    const showTotal = (total) => {
        return `共有 ${total} 条数据`;
      }
    const changeCurrent = (page, pageSize) => {
        setCurrent(page)
    }

    const showSizeChange = (current, size) => {
        setPageSize(size)
    }
      

    return (
        <>
        <Table rowKey={ record => record.id }
         dataSource={ productList }
         columns={ columns }
         pagination={ false }
        //  pagination={{
        //     showSizeChanger: true,
        //     showQuickJumper: true,
        //     pageSizeOptions: [10,15,20,50],
        //     total: total,
        //      current: current,
        //      pageSize: pageSize,
        //      showTotal: (total, range) => {
        //          return `共有${total}条数据`
        //      },
        //      onChange: (page, pageSize) => {
        //         setCurrent(page)
        //      },
        //      onShowSizeChange: (current, size) => {
        //          setPageSize(size)
        //      }
        //  }}
         scroll={{ y: 700, x: 1400 }}
         />
         <Pagination 
         showQuickJumper 
         showSizeChanger
         current = { current }
         pageSize = { pageSize } 
         total = { total }
         showTotal={showTotal}
         onChange = { changeCurrent }
         onShowSizeChange={ showSizeChange }
         />
        </>
    );
}

export default List;
