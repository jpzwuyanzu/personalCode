import React, { useState, useEffect } from 'react';
import { Table, Image, Button, Space , Popconfirm} from 'antd'
import { laodProData } from './../../api/pro'

const ShowTable = () => {

    const [dataSource, setDataSource] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(5)
    const [total, setTotal] = useState(0)

    const [selectedRowKeys, setSelectedRowKeys] = useState([])

    useEffect(() => {
        if(sessionStorage.getItem('admin_table_data')) {
          const cacheArr = JSON.parse(sessionStorage.getItem('admin_table_data'))
          setDataSource(cacheArr)
        } else {
        laodProData({}).then(res => {
          sessionStorage.setItem('admin_table_data', JSON.stringify(res.data.data))
            setDataSource(res.data.data)
            setTotal(res.data.data.length)
        })
        }
    }, [])

      const columns = [
        {
          title: '序号',
          dataIndex: 'proid',
          key: 'proid',
          align: 'center'
        },
        {
          title: '产品名称',
          dataIndex: 'proname',
          key: 'proname',
          align: 'center'
        },
        {
          title: '产品图片',
          dataIndex: 'imgUrl',
          align: 'center',
          render: (text, record, index) => {
            return (
                <Image src={ text } width="100px" height="100px" />
            )
          }
        },
        {
            title: '产品价格',
            dataIndex: 'price',
            key: 'price',
            align: 'center'
          },
          {
            title: '产品描述',
            dataIndex: 'desc',
            key: 'desc',
            align: 'center'
          },
          {
            title: '操作',
            align: 'center',
            render: (text, record, index) => {
              return (
                <Space>
                  <Popconfirm
                    title="确定要删除该产品吗?"
                    onConfirm={ (e) => {
                      // 在这里执行删除
                      let tempArr = dataSource
                      tempArr = tempArr.filter(item => item.proid !== record.proid)
                      setDataSource(tempArr)
                      sessionStorage.setItem('admin_table_data', JSON.stringify(tempArr))
                    } }
                    okText="确定"
                    cancelText="取消"
                  >
                    <Button type="primary" danger>删除</Button>
                  </Popconfirm>
                </Space>
              )
            }
          }
      ]
    
    const onSelectChange = (selectedRowKeys, selectedRows) => {
        // console.log(selectedRowKeys)
        // console.log(selectedRows)
        setSelectedRowKeys(selectedRowKeys)
    }

    const rowSelection = {
      selectedRowKeys,
      onChange: onSelectChange
    };

    return (
        <>
            <div style={{ marginBottom: '20px' }}>
                <Space size="middle">
                    <Button type="primary">新增产品</Button>
                    {
                        selectedRowKeys.length > 0 ? <Button type="danger">批量删除</Button> : null
                    }
                </Space>
            </div>
            <Table 
            rowSelection={ rowSelection }
            rowKey={ record => record.proid }
            dataSource={dataSource}
            columns={columns}
            scroll={{ y: 610 }}
            pagination={{
                position: ['bottomRight'],
                showSizeChanger: true,
                pageSizeOptions: ['5', '10', '15'],
                showQuickJumper: true,
                current: current,
                pageSize: pageSize,
                total: total,
                showTotal: (total, range) => {
                    // console.log(total, range)
                    return `共有${ total }数据`
                },
                onChange: (page, pageSize) => {
                    setCurrent(page)
                },
                onShowSizeChange: (current, size) => {
                    setPageSize(size)
                }
            }}
             />
        </>
    );
}

export default ShowTable;
