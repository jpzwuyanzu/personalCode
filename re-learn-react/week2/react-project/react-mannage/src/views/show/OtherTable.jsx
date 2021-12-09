import React, { useState, useEffect } from 'react';
import { Table, Image, Space, Switch, Button } from 'antd'

const OtherTable = () => {
    const [proList, setProList] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [total, setTotal] = useState(0)

    const columns = [
        {
            title: '序号',
            render: (text, record, index) => <span>{ index }</span>,
            width: 100,
            fixed: 'left'
        },
        {
            title: '产品名称',
            dataIndex: 'proname',
            key: 'proname',
            align: 'center',
            width: 150,
            fixed: 'left'
        },
        {
            title: '产品分类',
            dataIndex: 'categoryname',
            key: 'categoryname',
            align: 'center',
            width: 150
        },
        {
            title: '活动时间',
            dataIndex: 'activityDays',
            key: 'activityDays',
            align: 'center',
            width: 150
        },
        {
            title: '产品图片',
            dataIndex: 'img',
            key: 'img',
            align: 'center',
            width: 150,
            render: (text, record, index) => {
                return(
                    <Image src={ text } width={ 100 } height={ 100 } />
                )
            }
        },
        {
            title: '产品描述',
            dataIndex: 'descri',
            key: 'descri',
            align: 'center',
            width: 400
        },
        {
            title: '产品原价',
            dataIndex: 'originPrice',
            key: 'originPrice',
            align: 'center',
            width: 100
        },
        {
            title: '产品折扣价格',
            dataIndex: 'newPrice',
            key: 'newPrice',
            align: 'center',
            width: 150
        },
        {
            title: '是否推荐',
            dataIndex: 'isRecommond',
            key: 'isRecommond',
            align: 'center',
            width: 100,
            render: (text, record, index) => {
                return (
                    <Switch defaultChecked={ text * 1 === 1 } onChange={ (checked) => {
                        console.log(checked)
                    } }/>
                )
            }
        },
        {
            title: '是否打折',
            dataIndex: 'isKill',
            key: 'isKill',
            align: 'center',
            width: 100,
            render: (text, record, index) => {
                return (
                    <Switch defaultChecked={ text * 1 === 1 } onChange={ (checked) => {
                        console.log(checked)
                    } }/>
                )
            }
        },
        {
            title: '是否上架',
            dataIndex: 'isSale',
            key: 'isSale',
            align: 'center',
            fixed: 'right',
            width: 100,
            render: (text, record, index) => {
                return (
                    <Switch defaultChecked={ text * 1 === 1 } onChange={ (checked) => {
                        console.log(checked)
                        const tempArr = proList
                        tempArr[index].isSale = checked
                        sessionStorage.setItem('admin_pro_data', JSON.stringify(tempArr))
                        setProList(tempArr)
                    } }/>
                )
            }
        },
        {
            title: '操作',
            align: 'center',
            width: 200,
            fixed: 'right',
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

    useEffect(() => {
        if(sessionStorage.getItem('admin_pro_data')) {
            const cacheArr = JSON.parse(sessionStorage.getItem('admin_pro_data'))
            setProList(cacheArr)
            setTotal(cacheArr.length)
        } else {
            fetch('/otherProduct.json').then(res => res.json()).then(result => {
                // console.log(result)
                sessionStorage.setItem('admin_pro_data', JSON.stringify(result.result))
                setProList(result.result)
                setTotal(result.result.length)
            })
        }
    }, [])

    return (
        <>
          <Table 
          rowKey={ (record) => record.id }
          dataSource={ proList }
          columns={ columns }
          scroll={{
              x: 1300,
              y: 680
          }}
          pagination={{
              showQuickJumper: true,
              showSizeChanger: true,
              showTotal: (total, range) => {
                  return `共有${total}条数据`
              },
              current: current,
              pageSize: pageSize,
              total: total,
              onChange: (page, pageSize) => {
                setCurrent(page)
              },
              onShowSizeChange: (current, size) => {
                setPageSize(size)
              }
          }}
            />
        </>
    );
}

export default OtherTable;
