import React, { useEffect, useState } from 'react';
import styles from './index.less';
import { getBannerlist } from '@/api/banner'
import { Table, Space, Button } from 'antd'
import { history } from 'umi'
import { 
  EditOutlined, 
  DeleteOutlined 
} from '@ant-design/icons'

interface IBanner {
  alt: string,
  bannerid: string,
  bannerimg: string,
  link: string
}

export default function Page() {
  const [bannerList, setBannetList] = useState([])

  useEffect(() => {
    async function getData () {
      const res = await getBannerlist()
      setBannetList(res.data)
    }
    getData()
  }, [])

  const columns = [
    {
      title: '序号',
      render: (text: string | number | boolean, record: IBanner, index: number) => <span>{ index + 1 }</span>
    },
    {
      title: '图片',
      key: 'bannerimg',
      dataIndex: 'bannerimg',
      render: (text: string, record: IBanner) => {
        return <img src={ text } style={{ width: '100px' }} alt=""/>
      }
    },
    {
      title: '操作',
      render: (text: any, record: IBanner) =>  <Space>
        <Button type="primary" onClick = { () => {
          history.push('/banner/detail/' + record.bannerid)
        } } shape="circle" icon={<EditOutlined />} />
        <Button danger shape="circle" icon={<DeleteOutlined />} />
      </Space>
    }
  ]

  return (
    <Table dataSource={ bannerList } columns={ columns }  rowKey={ item => item.bannerid } />
  );
}
