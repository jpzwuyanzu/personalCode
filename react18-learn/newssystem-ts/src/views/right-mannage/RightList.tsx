import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import axios from 'axios'
import { render } from '@testing-library/react';

const RightList = () => {

    const [dataSource, setDataSource] = useState([])
    const columns = [
        {
          title: 'ID',
          dataIndex: 'id',
          key: 'id'
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
      ];

      useEffect(() => {
          axios.get('http://localhost:3000/rights').then(res => {
              console.log(res.data)
              setDataSource(res.data)
          })
      },[])

    return (
        <div>
            <Table dataSource={dataSource} columns={columns} pagination={{ pageSize: 3 }}/>
        </div>
    )
}

export default RightList
