import React, { useEffect } from 'react';
import styles from './index.less';
import { useModel } from 'umi'
import { Table } from 'antd'

export default function IndexPage() {

  //useModel的第二个参数是性能提升，
  const { prolist } = useModel('pro' , (model: any) => {
    console.log(model)
    return {
      prolist: model.prolist
    }
  })

  const columns = [
    {
      title: '序号',
      render: (text: any, record: any, index: number) => <span>{ index + 1 }</span>
    }, 
    {
      title: '产品名称',
      key: "proname",
      dataIndex: 'proname'
    },
    {
      title: '价格',
      key: 'originPrice',
      dataIndex: 'originPrice'

    }
  ]

  return (
    <Table dataSource= { prolist } columns= { columns } rowKey = { item => item.id } />
  );
}
