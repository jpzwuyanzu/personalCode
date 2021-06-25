import React, { useEffect, useState } from 'react';
import {Table, Image, Switch, Space} from 'antd'

const Recomondlist = () => {

    const [prolist, setProlist] = useState([])

    useEffect(()=> {
        if(sessionStorage.getItem('admin_prolist')) {
            const cacheArr = JSON.parse(sessionStorage.getItem('admin_prolist'))
            const newArr = cacheArr.filter((item) => item.isRecommond * 1 === 1)
            setProlist(newArr)
        }
    },[])

    const columns = [
        {
            title:'序号',
            fixed:'left',
            width:'150px',
            align:'center',
            render:(text, record, index) => {
                return (<span>{index }</span>)
            }
        },
        {
            title:'商品名称',
            dataIndex:'proname',
            key:'proname',
            fixed:'left',
            width:'150px',
            align:'center',
        },
        {
          title:"商品分类" ,
          width:'150px',
          align:'center',
          dataIndex:'categoryname',
          key:"categoryname",
          filters: [
            { text: '热门推荐M', value: '热门推荐M' },
            { text: '3C专区', value: '3C专区' },
          ],
          onFilter: (value, record) => record.categoryname.includes(value),
        },
        {
            title:"品牌" ,
            width:'150px',
            align:'center',
            dataIndex:'name',
            key:"name"
          },
        
        {
            title:'商品描述',
            dataIndex:'descri',
            key:'descri',
            width:'400px',
            align:'center'
        },
        {
            title:'原价',
            dataIndex:'originPrice',
            key:'originPrice',
            width:'150px',
            align:'center',
            // 单列排序
            // sorter: (a, b) => a.originPrice - b.originPrice
            //多列排序
            sorter:{ 
                compare:(a, b) => a.originPrice - b.originPrice,
                multiple:2
            }
        },
        {
            title:'现价',
            dataIndex:'newPrice',
            key:'newPrice',
            width:'150px',
            align:'center',
            // sorter: (a, b) => a.newPrice - b.newPrice
            sorter:{
                compare:(a, b) => a.originPrice - b.originPrice,
                multiple:1
            }
        },
        {
            title:'商品图片',
            dataIndex:'img',
            width:'150px',
            align:'center',
            render:(text,record,index) => {
                return <Image src={text} width={60} height={60} />
            }
        },
        {
            title:'是否推荐',
            dataIndex:'isRecommond',
            key:'isRecommond',
            width:'150px',
            align:'center',
            render:(text,record, index) => {
                return <Switch disabled  checked={text * 1 === 1}  />
            }
        },
        {
            title:'操作',
            fixed:'right',
            width:'150px',
            align:'center',
            render:(text,record, index) => {
                return <Space>
                    <span>编辑</span>
                    <span>｜</span>
                    <span>删除</span>
                </Space>
            }
        }
    ]
    
    return (
        <>
        <Table
        dataSource={ prolist }
        columns={columns}
        rowKey={(record) => record.id}
        />
        </>
    );
}

export default Recomondlist;

