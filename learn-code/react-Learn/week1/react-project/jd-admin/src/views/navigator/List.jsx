import React, { useEffect, useState } from 'react';
import {Table, Image, Button, Space} from 'antd'

const NavigatorList = () => {
    const [navlist, setNavlist] = useState([])
    useEffect(() => {
        fetch('/navgatorlist.json').then(res => res.json()).then(result => {
            console.log(result)
            setNavlist(result.result)
        })
    },[])

    const columns = [
        {
            title:'序号',
            render:(text, record, index) => {
              return  <span>{index + 1}</span>
            }
        },
        {
            title:'分类',
            dataIndex:'categoryname',
            key:'categoryname'

        },
        {
            title:'标识',
            dataIndex:'name',
            key:'name'

        },
        {
           title:'图标',
           dataIndex:'icon',
           key:'icon',
           render:(text,record, index) => {
               return <Image src={text} style={{height:'80px'}} />
           } 
        },
        {
            title:'操作',
            render:(text, record, index) => {
                return  <Space>
                    <Button>编辑</Button>
                    <Button>删除</Button>
                </Space>
            }
        }
    ]

    //分页配置
    const [pagesize, setPagesize] = useState(5)
    const [current, setCurrent] = useState(1)
    const [total, setTotal] = useState(0)

    return (
        <>
        <Table 
        dataSource={navlist} 
        rowKey={(record) => record.id}  
        columns={columns} 
        pagination={{
            position: ['bottomRight'],
            showSizeChanger: true,
            pageSizeOptions: [5, 10, 15, 20, 50],
            showQuickJumper: true,
            total: total,
            current: current,
            pageSize: pagesize,
            // hideOnSinglePage: true  // 慎用
            showTotal: (total, range) => {
              console.log(total, range)
              return `共有${total} 条数据`
            },
            onChange: (page, pageSize) => {
              setCurrent(page)
            },
            onShowSizeChange: (current, size) => {
              setPagesize(size)
            }

        }}
        />
        </>
    );
}

export default NavigatorList;
