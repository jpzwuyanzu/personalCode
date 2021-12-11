import React, { useState, useEffect } from 'react';
import { Table, Avatar, Image } from 'antd'
import TelShow from './../../components/TelShow'
import TimeShow from './../../components/TimeShow'



const UserList = () => {
  const [userlist, setUserList] = useState([])

  useEffect(() => {
      async function fetchData() {
          const res = await fetch('/userlist.json').then(res => res.json())
          setUserList(res.result)
      }
      fetchData()
  },[])

  const columns = [
      {
          title: '序号',
          render: (text, record, index) => <span>{ index + 1 }</span>
      },
      {
          title: '手机号',
          dataIndex: 'phone',
          key: 'phone',
          width: 200,
          render: (text) => {
              return(
                  <TelShow tel={ text } />
              )
          }
      },
      {
          title: '头像',
          dataIndex: 'avator',
          render: (text, record, index) => {
              return (
                <Avatar src={<Image src={ text } style={{ width: 32 }} />} />
              )
          }
      },
      {
          title: '用户名',
          dataIndex: 'username',
          key: 'username'
      },
      {
          title: '用户等级',
          dataIndex: 'level',
          key: 'level'
      },
      {
          title: '注册时间',
          dataIndex: 'regtime',
          key: 'regtime',
          render: (text) => {
              return(
                  <TimeShow regTime={ text } />
              )
          }
      }
  ]


    return (
        <>
            <Table rowKey={ record => record.id }  dataSource={ userlist }  columns={ columns }/>
        </>
    );
}

export default UserList;
