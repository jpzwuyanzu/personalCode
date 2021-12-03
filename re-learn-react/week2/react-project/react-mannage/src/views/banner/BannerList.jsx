import React from 'react';
import { Table, Button, Space } from 'antd'


const dataSource = [
    {
      key: '1',
      name: '胡彦斌',
      age: 32,
      address: '西湖区湖底公园1号',
    },
    {
      key: '2',
      name: '胡彦祖',
      age: 42,
      address: '西湖区湖底公园1号',
    },
  ];
  
  const columns = [
      {
          title: '序号',
          align: 'center',
          render: (text, record, index) => <span>{ index + 1 }</span>
      },
      {
        title: '轮播图',
        align: 'center',
        dataIndex: 'bannerimg',
        key: 'bannerimg'
      },
      {
        title: '链接地址',
        align: 'center',
        dataIndex: 'link',
        key: 'link'
      }, 
      {
        title: '操作',
        align: 'center',
        render: (text, record, index) => {
            return (
                <>
                <Space>
                <Button type="primary">
                 编辑
                </Button>
                <Button type="primary" danger>
                  删除
                </Button>
                </Space>
                </>
            )
        }
      }
  ];

const BannerList = (props) => {
    return (
        <>
           <Button type="primary" style={{ marginBottom: '30px' }} onClick={ () => {
               props.history.push('/bannermannage/add')
           } }>新增轮播图</Button>
           <Table dataSource={dataSource} columns={columns} />
        </>
    );
}

export default BannerList;
