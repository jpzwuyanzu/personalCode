import React, { Fragment, useEffect, useState } from 'react';
import { Button, Table, Space, Image, Popconfirm } from 'antd'
// import { loadBannerList } from './../../api/banner'
  

 
const BannerList = (props) => {

  const [ bannerList, setBannerList ] = useState([])
  //设置分页
  const [pageSize, setPageSize] = useState(5)
  const [ total, setTotal ] = useState(0)
  const [ current, setCurrent ] = useState(1)

  useEffect(() => {
    fetch('/lunbo.json').then(res => res.json()).then(result => {
      console.log(result)
      setBannerList(result.data)
    })
  }, [])

  const deleteItem = (bannberid) => () =>  {
    console.log(bannberid)
    // 在这里删除单条数据,并重新拉取数据
  }

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
      render: (text, record, index) => {
        return (
          <Image src={ text } width="60px" height="60px" />
        )
      }
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
                <Popconfirm
                  title="确定删除吗？"
                  onConfirm={ deleteItem(record.bannerid) }
                  okText="确定"
                  cancelText="取消"
                >
                  <span style={{ color: '#f00', cursor: 'pointer' }}>删除</span>
                </Popconfirm>
                </Space>
                </>
            )
        }
      },
  ];

  


    return (
        <Fragment>
            <Button type="primary" onClick={ () => {
                props.history.push('/bannermanager/add')
            } }>新增轮播图</Button>
            <Table 
            rowKey={ (record) => record.bannerid }
            dataSource={bannerList}  
            columns={columns}
            bordered={ true } //边框属性
            pagination={ {
              position: ['bottomLeft'],
              showSizeChanger: true,
              pageSizeOptions: [10 ,15, 20,50],
              showQuickJumper: true,
              pageSize: pageSize,
              // hideOnSinglePage: true //慎用，不可逆
              showTotal: (total, range) => {
                console.log(total, range)
                return `共有${ total }条数据`
              },
              total: total,
              current: current,
              onChange: (page, pageSize) => {
                setCurrent(page)
              },
              onShowSizeChange: (current, size) => {
                setPageSize(size)
              }
            } }
             />
        </Fragment>
    );
}

export default BannerList;
