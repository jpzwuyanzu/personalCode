import React, { useState, useEffect } from 'react';
import styles from './index.less';
import { getBannerlist } from '@/api/banner'
import { Table, Space, Button  } from 'antd'
import { 
  EditOutlined, 
  DeleteOutlined 
} from '@ant-design/icons'
import { history } from 'umi'

interface IBanner {
  alt: string,
  bannerid: string,
  bannerimg: string,
  link: string
}

export default function Page() {

  const [bannerList, setBannerList] = useState([])

  useEffect(() => {
    async function getData() {
      const res = await getBannerlist()
      setBannerList(res.data)
    }
    getData()
  },[])


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
      render: (record: any) =>  <Space>
        <Button type="primary" onClick={ () => {
          history.push('/banner/detail/' + record.bannerid)
        } }  shape="circle" icon={<EditOutlined />} />
        <Button danger shape="circle" icon={<DeleteOutlined />} />
      </Space>
    }
  ]

  return (
    <Table dataSource={ bannerList } columns={ columns }  rowKey={ item => item.bannerid } />
  );
}
