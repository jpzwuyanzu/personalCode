import React, { Fragment, useEffect, useState } from 'react';
import { Button, Table, Space , Popconfirm } from 'antd'
import { getBanner, deleteBanner, deleteAllBanner } from './../../api/banner'

const BannerList = (props) => {
  const [ bannerlist, setBannerlist ] = useState([])
  useEffect(() => {
    getBanner().then(res => {
      setBannerlist(res.data.data)
    })
  }, [])
  const deleteItem = (bannerid, index) => () => {
    console.log(bannerid)
    deleteBanner({ bannerid }).then(res => {
      let arr = JSON.parse(JSON.stringify(bannerlist))
      arr.splice(index, 1)
      setBannerlist(arr)
      setTotal(total-1)
      // console.log(total % pageSize)
      setCurrent((total % pageSize === 1) ? current - 1 : current)
    })
  }
  const cancel = () => {}
  const columns = [
    {
      title: '序号',
      align: 'center',
      render: (text, record, index) => <span>{record.bannerid}</span>
    },
    {
      title: <mark style={{ color: '#f66'}} onClick={() => { console.log('1111')}}>轮播图</mark>,
      align: 'center',
      dataIndex: 'bannerimg',
      key: 'bannerimg',
      render: (text, record, index) => (
        <img src={ text} alt="" style={{ height: '80px'}}/>
      )
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
          <Space>
            <Popconfirm
              title="确定删除吗?"
              onConfirm={ deleteItem(record.bannerid, (current - 1) * pageSize + index) }
              onCancel={ cancel }
              okText="确定"
              cancelText="取消"
            >
              <span style={{ color: '#f00', cursor: 'pointer'}}>删除</span>
            </Popconfirm>
          </Space>
        )
      }
    },
  ]

  // 设置分页
  const [pageSize, setPageSize] = useState(5)
  const [total, setTotal] = useState(0)
  const [current, setCurrent] = useState(1)

  const [selectedRowKeys, setSelectRowKeys] = useState([])
  const onSelectChange = (selectedRowKeys, selectedRow) => {
    // selectedRowKeys 选中的数据项组成的数组，数组元素对应 rowKey 设置的唯一字段名
    // selectedRow 选中的数据项组成的数组，数组元素对应 每条选中的数据对象
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    // console.log('selectedRowKeys changed: ', selectedRow);
    setSelectRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys, // 当前页面选中的项
    onChange: onSelectChange, // 获取选中的值
  };
  const deleteManyItem = () => {
    deleteAllBanner({
      deletearr: selectedRowKeys
    }).then(() => {
      setSelectRowKeys([])
      console.log('current', current)
      getBanner().then(res => {
        setBannerlist(res.data.data)
        console.log('current', current)
        console.log('pageSize', pageSize)
      })
    })
  }
  return (
    <Fragment>
      <Button 
      type="primary" 
      style={{ marginBottom: '10px'}}
      onClick = { () => props.history.push('/bannerMannager/add') }>
        添加轮播图
      </Button>
      {
        selectedRowKeys.length > 0 ? 
        <Button 
          type="primary" 
          style={{ marginBottom: '10px', marginLeft: "15px"}}
          onClick={ deleteManyItem }
          >
            批量删除
          </Button> : null
      }
      <Table 
      dataSource={bannerlist}
      rowSelection={rowSelection}
      scroll={{ y: '700px'}}
      columns={columns} 
      rowKey={record => record.bannerid}
      bordered={ true }
      pagination = { {
        position: ['bottomLeft'],
        showSizeChanger: true,
        pageSizeOptions: [5, 10, 15, 20, 50],
        showQuickJumper: true,
        // hideOnSinglePage: true  // 慎用
        pageSize: pageSize,
        showTotal: (total, range) => {
          console.log(total, range)
          return `共有${total} 条数据`
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
  )
}

export default BannerList;
