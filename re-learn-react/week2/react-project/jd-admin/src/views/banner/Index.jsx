import React, { Fragment, useEffect, useState } from 'react';
import { Button, Table, Space, Image, Popconfirm } from 'antd'
// import { loadBannerList } from './../../api/banner'
  

 
const BannerList = (props) => {

  const [ bannerList, setBannerList ] = useState([])
  //设置分页
  const [pageSize, setPageSize] = useState(10)
  const [ total, setTotal ] = useState(0)
  const [ current, setCurrent ] = useState(1)

  const [selectedRowKeys, setSelectedRowKeys] = useState([])

  useEffect(() => {
    fetch('/lunbo.json').then(res => res.json()).then(result => {
      // console.log(result)
      setBannerList(result.data)
    })
  }, [])

  const deleteItem = (bannberid, index) => () =>  {
    console.log(bannberid)
    // 在这里删除单条数据,并重新拉取数据
    let arr = JSON.parse(JSON.stringify(bannerList))
    arr.splice(index, 1)
    setBannerList(arr)
    setTotal(total - 1)
    setCurrent(Math.floor(total % pageSize === 1 ? (current -1) : current))
  }

  const columns = [
    {
      title: '序号',
      align: 'center',
      // text: 当前字段的值，index： 当前索引值
      render: (text, record, index) => <span>{ (current - 1) * pageSize + index + 1 }</span>
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
                  onConfirm={ deleteItem(record.bannerid, (current - 1) * pageSize + index) }
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

  
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    //selectedRowKeys 选中的数据项组成的数组， 数组元素对应rowkey设置的唯一字段名
    //selectedRows  选中的数据项组成的数组， 数组元素对应每条选中的数据对象
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    console.log(selectedRows)
    setSelectedRowKeys(selectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys, //当前页面选中的项
    onChange: onSelectChange, //获取选中的值
    // selections: [
    //   Table.SELECTION_ALL,
    //   Table.SELECTION_INVERT,
    //   Table.SELECTION_NONE,
    //   {
    //     key: 'odd',
    //     text: 'Select Odd Row',
    //     onSelect: changableRowKeys => {
    //       let newSelectedRowKeys = [];
    //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
    //         if (index % 2 !== 0) {
    //           return false;
    //         }
    //         return true;
    //       });
    //       setSelectedRowKeys(newSelectedRowKeys)
    //     },
    //   },
    //   {
    //     key: 'even',
    //     text: 'Select Even Row',
    //     onSelect: changableRowKeys => {
    //       let newSelectedRowKeys = [];
    //       newSelectedRowKeys = changableRowKeys.filter((key, index) => {
    //         if (index % 2 !== 0) {
    //           return true;
    //         }
    //         return false;
    //       });
    //       setSelectedRowKeys(newSelectedRowKeys)
    //     },
    //   },
    // ],
  };

  // 批量删除
  const deleteMannay = () => {

  }
  


    return (
        <Fragment>
            <div className="tableHeader">
            <Button type="primary" onClick={ () => {
                props.history.push('/bannermanager/add')
            } }>新增轮播图</Button>
            {
              selectedRowKeys.length > 0 ? 
              <Button type="primary" style={{ marginLeft: '15px' }}
              onClick={ deleteMannay }
              >批量删除</Button> : null
            }
            </div>
            <Table 
            rowSelection={rowSelection}
            rowKey={ (record) => record.bannerid }
            scroll={{ y: 610 }}
            dataSource={bannerList}  
            columns={columns}
            bordered={ true } //边框属性
            pagination={ {
              position: ['bottomRight'],
              showSizeChanger: true,
              showQuickJumper: true,
              pageSizeOptions: [10 ,15, 20,50],
              total: total,
              current: current,
              pageSize: pageSize,
              // hideOnSinglePage: true //慎用，不可逆
              showTotal: (total, range) => {
                // console.log(total, range)
                return `共有${ total }条数据`
              },
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
