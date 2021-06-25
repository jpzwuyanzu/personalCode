import React, {useEffect, useState} from 'react';
import { Table, Image } from 'antd'

const List = () => {
    const [datasource, setDatasource] = useState([])
    const [pagesize,setPagesize] = useState(10)
    const [currentpage,setCurrentpage] = useState(1)

    const columns = [
        {
            title:'序号',
            fixed:'left',
            width:'150px',
            align:'center',
            render:(text, record, index) => {
                return (<span>{ (currentpage - 1) * pagesize +   index + 1  }</span>)
            }
        },
        {
            title:"用户名",
            dataIndex:'name',
            key:"name",
            fixed:'left',
            width:'150px',
            align:'center',
        },
        {
            title:"用户ID",
            dataIndex:'userid',
            key:'userid',
            width:'150px',
            align:'center',
        },
        {
            title:"用户头像",
            dataIndex:'avator',
            key:'avator',
            width:'150px',
            align:'center',
            render:(text) => {
                return (<Image width={40} height={40} src={text} />)
            }
        },
        {
            title:"个性签名",
            dataIndex:'sign',
            key:'sign',
            width:'600px',
            align:'center',
        },
        {
            title:"QQ账号",
            dataIndex:'qq',
            key:'qq',
            width:'150px',
            align:'center',
        },
        {
            title:"WeChat账号",
            dataIndex:'wechat',
            key:'wechat',
            width:'150px',
            align:'center',
        },
        {
            title:"微博账号",
            dataIndex:'weibo',
            key:'weibo',
            fixed:'right',
            width:'150px',
            align:'center',
        },
        {
            title:"点赞量",
            dataIndex:'zan',
            key:'zan',
            fixed:'right',
            width:'150px',
            align:'center',
        }
    ]
    
    useEffect(() => {
        fetch('/userList.json').then(res=> res.json()).then(result => {
            setDatasource(result.result)
        })
    }, []);

    return (
        <>
            <Table columns={columns} 
            dataSource={datasource}
            rowKey={(record) => record.userid}
            scroll={{y:'600px'}}
            pagination={{
                // position:['bottomLeft'],
                pageSize:pagesize,
                current:currentpage,
                pageSizeOptions:[10,20,30],
                showQuickJumper:true,
                showSizeChanger:true,
                showTotal:(total,range) => {
                    // console.log(total, range)
                    return (`共有${total}条数据`)
                },
                onShowSizeChange:(current,size) => {
                    console.log(current, size)
                    setPagesize(size)
                },
                onChange:(page,pageSize) => {
                    console.log(page, pageSize)
                    setCurrentpage(page)
                }
            }}
             />
        </>
    );
}

export default List;
