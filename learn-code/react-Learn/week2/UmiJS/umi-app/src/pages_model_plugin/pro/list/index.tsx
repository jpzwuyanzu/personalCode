import React, { useEffect } from 'react';
import styles from './index.less';
import { useModel } from 'umi'
import { Table } from 'antd'

export default function Page() {

  const { prolist,  getProlistFn} = useModel('pro')

  useEffect(() => {
    getProlistFn()
  }, [])

  const columns = [
    {
      title: '序号',
      render: (text: any, record: any, index: number) => <span>{ index + 1 }</span>
    }, 
    {
      title: '产品名称',
      key: "proname",
      dataIndex: 'proname'
    }
  ]

  return (
    <Table dataSource= { prolist } columns= { columns } rowKey = { item => item.id } />
  );
}
