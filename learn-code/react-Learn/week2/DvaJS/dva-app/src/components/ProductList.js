import React from 'react'

import { Table } from 'antd'

function ProductList ({ prolist }) {
    console.log(prolist)

    const columns = [
        {
            title: '序号',
            render: (text, record, index) => <span>{ index+1 }</span>
        },
        {
            title: '产品名称',
            key: 'proname',
            dataIndex: 'proname'
        }
    ]
    return (
        <Table dataSource={ prolist } columns={ columns } rowKey = { item => item.id } />
    )
}

export default ProductList