import React, { Component } from 'react';
import {Table , Image, Space, Switch, Pagination} from 'antd'

class ProductList extends Component {
    state = {
        proList:[], //列表
        total: 0, //总数量
        current: 1, //默认页数
        pageSize: 10, //每页显示的默认个数
        categorylist:[] //作为筛选列表，数据可以从后端获取
    }

    async componentDidMount() {
        if(sessionStorage.getItem('admin_prolist')) {
            const cacheArr = JSON.parse(sessionStorage.getItem('admin_prolist'))
            this.setState({
                proList: cacheArr
            })
        } else {
            const res = await fetch('/pro.json').then(res => res.json())
            console.log(res)
            this.setState({
                proList: res.result,
                total:34
            })
        }
    }

    columns = [
        {
            title:'序号',
            fixed:'left',
            width:'150px',
            align:'center',
            render:(text, record, index) => {
                return (<span>{ (this.state.current - 1) * this.state.pageSize +   index + 1  }</span>)
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
                return <Switch defaultChecked={text * 1 === 1} onChange={(checked) => {
                    console.log(checked)
                    const arr = this.state.proList
                    arr[index].isKill = checked
                    sessionStorage.setItem('admin_prolist', JSON.stringify(arr))
                    this.setState({
                        proList: arr
                    })
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
                return <Switch defaultChecked={text * 1 === 1} onChange={(checked) => {
                    console.log(checked)
                    const arr = this.state.proList
                    arr[index].isRecommond = checked
                    sessionStorage.setItem('admin_prolist', JSON.stringify(arr))
                    this.setState({
                        proList: arr
                    })
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
    
    showTotal = (total) => {
        return `共有${total}条数据`
    }
    /**
     * 
     * onChange = {this.changeCurrent}
     * onShowSizeChange = {this.showSizeChange} 这个事件触发的时候也会触发上面的改变页码的事件,
     * 所以把数据请求放在改变页码的事件中
     */
    changeCurrent = async (page, pageSize) => {
        console.log(page, pageSize)
        //在这里请求数据 可以使用async await
        // res = await axios('../')
        this.setState({
            current: page
        })
    }
    showSizeChange = (current, size) => {
        this.setState({
            pageSize:size
        })
    }

    render() {
        return (
            <>
             <Table 
             dataSource={this.state.proList} 
             columns={this.columns} 
             rowKey = {(record => record.id)}
             pagination={false}
             scroll={{x:800, y:700}}
             />
             <Pagination
              showQuickJumper
              showSizeChanger
              current = {this.state.current}
              pageSize = { this.state.pageSize}
              total = {this.state.total}
              showTotal={this.showTotal}
              onChange = {this.changeCurrent}
              onShowSizeChange = {this.showSizeChange}
             />
            </>
        );
    }
}

export default ProductList;
