import React, { Fragment, useEffect } from 'react';
import { Button, Table, Space } from 'antd'
import { loadBannerList } from './../../api/banner'

const dataSource = [
    
  ];
  
  const columns = [
    {
      title: '序号',
      align: 'center',
      // text: 当前字段的值，index： 当前索引值
      render: (text, record, index) => <span>{ index + 1 }</span>
    },
    {
      title: '轮播图',
      align: 'center',
      dataIndex: 'bannerimg',
      key: 'bannerimg',
    },
    {
      title: '链接地址',
      align: 'center',
      dataIndex: 'link',
      key: 'link',
    },
    {
        title: '操作',
        align: 'center',
        render: (text, record, index) => {
            return (
                <>  
                <Space>
                    <span style={{ color: '#00a' }}>编辑</span>
                    <span>|</span>
                    <span style={{ color: '#f00' }}>删除</span>
                </Space>
                </>
            )
        }
      },
  ];

const BannerList = (props) => {

  useEffect(() => {
    loadBannerList().then(res => {
      console.log(res)
    })
  }, [])

    return (
        <Fragment>
            <Button type="primary" onClick={ () => {
                props.history.push('/bannermanager/add')
            } }>新增轮播图</Button>
            <Table dataSource={dataSource} columns={columns} />
        </Fragment>
    );
}

export default BannerList;
