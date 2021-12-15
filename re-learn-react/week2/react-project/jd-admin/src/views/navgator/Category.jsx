import React, { useEffect, useState } from 'react';
import { Table } from 'antd'
import { getCategory } from './../../api/navigetor'

const NavgatorCategory = () => {
    const [categorylist, setCategoryList] = useState([])
    useEffect(() => {
        // fetch('/navcategory.json').then(res => res.json()).then(result => {
        //     // console.log(result)
        //     setCategoryList(result.result.data)
        // })
        getCategory({}).then(res => {
            // console.log(res)
            setCategoryList(res.data.result.data)
        })
    }, [])
    const columns = [
        {
            title: '序号',
            align: 'center',
            render: (text, record, index) => <span>{ index + 1 }</span>
        },
        {
            title: '名称',
            dataIndex: 'name',
            key: 'name',
            align: 'center',
        }
    ]
    return (
       <>
        <Table rowKey={ record => record.id  } pagination={ false }  dataSource={categorylist} columns={columns} />
       </>
    );
}
export default NavgatorCategory;
