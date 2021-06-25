import React, { useEffect, useState } from 'react';
import { Form, Row, Col, Button , Input, Select, Table, Pagination, Image, Switch, Space } from 'antd'

const {Option}= Select;

const SortList = () => {
    const [proList, setProList] = useState([])
    const [current, setCurrent] = useState(1)
    const [pageSize, setPageSize] = useState(10)
    const [categorylist, setCategorylist] = useState([])
    const [total, setTotal] = useState(0)

    const [form] = Form.useForm();

    const onFinish = (values) => {
        console.log('Received values of form: ', values);
      };
      
      const columns = [
        {
            title:'序号',
            fixed:'left',
            width:'150px',
            align:'center',
            render:(text, record, index) => {
                return (<span>{ (current - 1) * pageSize +   index + 1  }</span>)
            }
        },
        {
            title:'商品名称',
            dataIndex:'proname',
            key:'proname',
            fixed:'left',
            width:'150px',
            align:'center',
        },
        {
          title:"商品分类" ,
          width:'150px',
          align:'center',
          dataIndex:'categoryname',
          key:"categoryname",
          filters: [
            { text: '热门推荐M', value: '热门推荐M' },
            { text: '3C专区', value: '3C专区' },
          ],
          onFilter: (value, record) => record.categoryname.includes(value),
        },
        {
            title:"品牌" ,
            width:'150px',
            align:'center',
            dataIndex:'name',
            key:"name"
          },
        
        {
            title:'商品描述',
            dataIndex:'descri',
            key:'descri',
            width:'400px',
            align:'center'
        },
        {
            title:'原价',
            dataIndex:'originPrice',
            key:'originPrice',
            width:'150px',
            align:'center',
            // 单列排序
            // sorter: (a, b) => a.originPrice - b.originPrice
            //多列排序
            sorter:{ 
                compare:(a, b) => a.originPrice - b.originPrice,
                multiple:2
            }
        },
        {
            title:'现价',
            dataIndex:'newPrice',
            key:'newPrice',
            width:'150px',
            align:'center',
            // sorter: (a, b) => a.newPrice - b.newPrice
            sorter:{
                compare:(a, b) => a.originPrice - b.originPrice,
                multiple:1
            }
        },
        {
            title:'商品图片',
            dataIndex:'img',
            width:'150px',
            align:'center',
            render:(text,record,index) => {
                return <Image src={text} width={60} height={60} />
            }
        },
        {
            title:'是否参与秒杀',
            dataIndex:'isKill',
            key:'isKill',
            width:'150px',
            align:'center',
            render:(text,record, index) => {
                return <Switch defaultChecked={text * 1 === 1}  onChange={(checked) => {
                    console.log(checked)
                    console.log(Boolean(text))
                    const arr = proList
                    arr[index].isKill = checked
                    setProList(arr)
                    sessionStorage.setItem('admin_prolist', JSON.stringify(arr))
                }}/>
            }
        },
        {
            title:'是否推荐',
            dataIndex:'isRecommond',
            key:'isRecommond',
            width:'150px',
            align:'center',
            render:(text,record, index) => {
                return <Switch defaultChecked={text * 1 === 1}  onChange={(checked) => {
                    console.log(checked)
                    console.log(Boolean(text))
                    const arr = proList
                    arr[index].isRecommond = checked
                    setProList(arr)
                    sessionStorage.setItem('admin_prolist', JSON.stringify(arr))
                }}/>
            }
        },
        {
            title:'是否打折',
            dataIndex:'isSale',
            key:'isSale',
            width:'150px',
            align:'center',
            render:(text,record, index) => {
                return <Switch disabled  checked={text * 1 === 1}  />
            }
        },
        {
            title:'操作',
            fixed:'right',
            width:'150px',
            align:'center',
            render:(text,record, index) => {
                return <Space>
                    <span>编辑</span>
                    <span>｜</span>
                    <span>删除</span>
                </Space>
            }
        }
    ]

    useEffect(() => {
        if(sessionStorage.getItem('admin_prolist')) {
            const cacheArr = JSON.parse(sessionStorage.getItem('admin_prolist'))
           setProList(cacheArr)
        } else {
            fetch('/pro.json').then(res => res.json()).then(result => {
                setProList(result.result)
                setTotal(34)
            })
        }
    },[])

    
    
    const showTotal = (total) => {
        return `共有${total}条数据`
    }
    /**
     * 
     * onChange = {this.changeCurrent}
     * onShowSizeChange = {this.showSizeChange} 这个事件触发的时候也会触发上面的改变页码的事件,
     * 所以把数据请求放在改变页码的事件中
     */
    const changeCurrent = async (page, pageSize) => {
        console.log(page, pageSize)
        //在这里请求数据 可以使用async await
        // res = await axios('../')
        setCurrent(page)
    }
    const showSizeChange = (current, size) => {
        setPageSize(size)
    }

    return (
       <>
        <Form
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        onFinish={onFinish}>
            <Row gutter={24}>
            <Col span={2} >
                    <Form.Item
                        name='category'>
                        <Select 
                        showSearch
                         >
                            <Option value="jack">Jack</Option>
                            <Option value="lucy">Lucy</Option>
                            <Option value="Yiminghe">yiminghe</Option>
                        </Select>
                    </Form.Item>
                </Col>
                <Col span={4} >
                    <Form.Item
                        name='proname'>
                        <Input placeholder="输入关键词搜索产品" />
                    </Form.Item>
                </Col>
                <Col span={4} style={{ textAlign: 'left' }}>
                    <Button type="primary" htmlType="submit">
                        查询
                    </Button>
                </Col>
            </Row>
            <Row>
        </Row>
        </Form>
        <Table 
             dataSource={proList} 
             columns={columns} 
             rowKey = {(record => record.id)}
             pagination={false}
             scroll={{x:800, y:650}}
             />
             <Pagination
              showQuickJumper
              showSizeChanger
              current = {current}
              pageSize = { pageSize}
              total = {total}
              showTotal={showTotal}
              onChange = {changeCurrent}
              onShowSizeChange = {showSizeChange}
             />
       </>
    );
}

export default SortList;
