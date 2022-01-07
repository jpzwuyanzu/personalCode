import React, { useState, useEffect } from 'react';
import { loadUserList } from './../../api/user'
import { Table, Button, Space } from 'antd'
import TelShow from './../../components/TelShow'
import TimeShow from './../../components/TimeShow'

const UserList = () => {
    
    const [userList, setUserList] = useState([])
    useEffect(() => {
       loadUserList({}).then(res => {
           console.log(res)
           setUserList(res.data.result)
       })
    }, [])
    const columns = [
        {
            title: "用户名称",
            dataIndex: "userName",
            key: "userName",
            align: "center"
        },
        {
            title: "用户ID",
            dataIndex: "userId",
            key: "userId",
            align: "center"
        },
        {
            title: "用户等级",
            dataIndex: "level",
            key: "level",
            align: "center"
        },
        {
            title: "是否是会员",
            dataIndex: "isVip",
            align: "center",
            render: (text, record, index) => {
                return (
                    <span>{ text ? '会员' : '非会员' }</span>
                )
            }
        },
        {
            title: "金币数量",
            dataIndex: "coin",
            key: "coin",
            align: "center"
        },
        {
            title: "账号状态",
            dataIndex: "userState",
            key: "userState",
            align: "center",
            render: (text, record, index) => {
                return (
                    <span>{ text === 1 ? '正常' : '冻结' }</span>
                )
            }
        },
        {
            title: "手机号码",
            dataIndex: "phoneNum",
            key: "phoneNum",
            align: "center",
            width: 200,
            render: (text, record, index) => {
                return (
                    <TelShow tel={ text } />
                )
            }
        },
        {
             title: "最后登录时间",
             dataIndex: "lastLoginTime",
             key: "lastLoginTime",
             align: "center",
             render: (text, record, index) => {
                 return (
                     <TimeShow time={ text } />
                 )
             }
        },
        {
            title: "操作",
            align: "center",
            render: (text, record, index) => {
                return(
                    <Space>
                        <Button type="primary" danger>冻结</Button>
                        <Button type="primary">解封</Button>
                    </Space>
                )
            }
        }
    ]



    return (
        <>
        <Table 
        dataSource={ userList }
        columns={ columns }
        rowKey="userId"
        />
        </>
    );
}

export default UserList;
