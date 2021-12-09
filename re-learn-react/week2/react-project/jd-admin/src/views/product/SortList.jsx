import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Input, Select } from "antd";
// import { getProCategory, searchPro } from './../../api/pro'
import { Table, Image, Space, Switch} from 'antd'

const { Option } = Select

const SortList = () => {
    const [ categoryList, setCategoryList ] = useState([])
    const [ proList, setproList ] = useState([])

    useEffect(() => {
        fetch('/procategory.json').then(res => res.json()).then(result => {
            console.log(result)
            setCategoryList(result.result)
        })
    }, [])

    useEffect(() => {
        if(sessionStorage.getItem('admin_product')) {
            const cacheArr = JSON.parse(sessionStorage.getItem('admin_product'))
            setproList(cacheArr)
        } else {
            fetch('/product.json').then(res => res.json()).then(result => {
                sessionStorage.setItem('admin_product', JSON.stringify(result.result))
                setproList(result.result)
            })
        }
    }, [])

    const columns = [
        {
            title: '序号',
            render: (text, record, index) => <span>{ index + 1 }</span>,
            align: 'center',
            fixed: 'left',
            width: 100
        },
        {
            title: '商品名称',
            dataIndex: 'proname',
            key: 'proname',
            align: 'center',
            fixed: 'left',
            width: 100
            
        },
        {
            title: '商品分类',
            dataIndex: 'categoryname',
            key: 'categoryname',
            align: 'center',
            width: 150
        },
        {
            title: '商品图片',
            dataIndex: 'img',
            width: 150,
            key: 'img',
            render: (text, record, index) => {
                return (
                    <Image src={ text } width={ 100 } height={ 100 } />
                )
            },
            align: 'center'
        },
        {
            title: '商品原价',
            dataIndex: 'originPrice',
            key: 'originPrice',
            align: 'center',
            width: 150,
            sorter: {
                compare: (a, b) => a.originPrice - b.originPrice,
                multiple: 1
            }
        },
        {
            title: '现售价',
            dataIndex: 'newPrice',
            key: 'newPrice',
            align: 'center',
            width: 150,
            sorter: {
                compare: (a, b) => a.newPrice - b.newPrice,
                multiple: 2
            }
        },
        {
            title: '商品描述',
            dataIndex: 'descri',
            key: 'descri',
            width: 500,
            align: 'center'
        },
        {
            title: '是否推荐',
            dataIndex: 'isRecommond',
            key: 'isRecommond',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (text, record, index) => {
                return(
                    <Switch defaultChecked={ text * 1 === 1 } disabled={ true } />
                )
            }
        },
        {
            title: '上架状态',
            dataIndex: 'isSale',
            key: 'isSale',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (text) => {
                return(
                    <Switch defaultChecked={ text * 1 === 1 } disabled={ true } />
                )
            }
        },
        {
            title: '是否秒杀',
            dataIndex: 'isKill',
            key: 'isKill',
            align: 'center',
            width: 100,
            fixed: 'right',
            render: (text, record, index) => {
                return <Switch defaultChecked={text * 1 === 1} onChange={(checked) => {
                    console.log(checked)
                    const arr = proList
                    let tempArr = []
                    arr[index].isKill = checked
                    tempArr = sessionStorage.getItem('sort_product') ? JSON.parse(sessionStorage.getItem('sort_product')) : []
                    tempArr.push(arr[index])
                    sessionStorage.setItem('admin_product', JSON.stringify(arr))
                    sessionStorage.setItem('sort_product', JSON.stringify(tempArr))
                    setproList(arr)
                }}/>
            }
        },
        {
            title: '操作',
            fixed: 'right',
            width: 200,
            align: 'center',
            render: (text, record, index) => {
                return(
                    <Space>
                        <Button type="primary">编辑</Button>
                        <Button type="primary" danger>删除</Button>
                    </Space>
                )
            }
        }
    ]

    const [form] = Form.useForm();
    const onFinish = (values) => {
        console.log(values);
        // 在这里根据参数查询产品列表,因为没有使用axios，暂时使用fetch请求本地数据代替
        fetch('/product.json').then(res => res.json()).then(result => {
            setproList(result.result)
        })
    };

    return (
        <>
            <Form
                form={form}
                name="advanced_search"
                className="ant-advanced-search-form"
                initialValues={{
                    category: ''
                }}
                onFinish={onFinish}
            >
                <Row gutter={24}>
                    <Col span={3}>
                        <Form.Item
                            name="category"
                        >
                            <Select showSearch>
                            <Option value="">全部</Option>
                                {
                                    categoryList.map((item, index) => {
                                        return (
                                            <Option key={ index } value={ item.categoryname }>{ item.categoryname }</Option>
                                        )
                                    })
                                }
                            </Select>
                        </Form.Item>
                    </Col>
                    <Col span={4}>
                        <Form.Item
                            name="search"
                        >
                            <Input placeholder="输入关键词搜索产品" allowClear />
                        </Form.Item>
                    </Col>
                    <Col
                        span={4}
                    >
                        <Button type="primary" htmlType="submit">
                            查询
                        </Button>
                    </Col>
                </Row>
            </Form>
            <Table rowKey={ record => record.id  } dataSource={ proList } columns={ columns } scroll={{ y: 600 }} />
        </>
    );
};

export default SortList;
