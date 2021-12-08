import React from 'react';
import { Table, Divider } from 'antd'

const MyTable = () => {

    const data1 = [
        {
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
          },
          {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
          },
          {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
          },
          {
            key: '4',
            name: 'Jim Red',
            age: 32,
            address: 'London No. 2 Lake Park',
          }
    ]
    const columns1 = [
        {
            title: 'Name',
            dataIndex: 'name',
            filters: [
              {
                text: 'Joe',
                value: 'Joe',
              },
              {
                text: 'Jim',
                value: 'Jim',
              },
              {
                text: 'Submenu',
                value: 'Submenu',
                children: [
                  {
                    text: 'Green',
                    value: 'Green',
                  },
                  {
                    text: 'Black',
                    value: 'Black',
                  },
                ],
              },
            ],
            // specify the condition of filtering result
            // here is that finding the name started with `value`
            onFilter: (value, record) => record.name.indexOf(value) === 0,
            sorter: (a, b) => a.name.length - b.name.length,
            sortDirections: ['descend'],
          },
          {
            title: 'Age',
            dataIndex: 'age',
            defaultSortOrder: 'descend',
            sorter: (a, b) => a.age - b.age,
          },
          {
            title: 'Address',
            dataIndex: 'address',
            filters: [
              {
                text: 'London',
                value: 'London',
              },
              {
                text: 'New York',
                value: 'New York',
              },
            ],
            onFilter: (value, record) => record.address.indexOf(value) === 0,
          }
    ]
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
      }
    
      const columns2 = [
        {
          title: 'Name',
          dataIndex: 'name',
          render: text => <span>{ text }</span>
        },
        {
          title: 'Cash Assets',
          className: 'column-money',
          dataIndex: 'money',
          align: 'right',
        },
        {
          title: 'Address',
          dataIndex: 'address',
        },
      ];
      
      const data2 = [
        {
          key: '1',
          name: 'John Brown',
          money: '￥300,000.00',
          address: 'New York No. 1 Lake Park',
        },
        {
          key: '2',
          name: 'Jim Green',
          money: '￥1,256,000.00',
          address: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          name: 'Joe Black',
          money: '￥120,000.00',
          address: 'Sidney No. 1 Lake Park',
        },
      ];

      const columns3 = [
        {
          title: 'Full Name',
          width: 100,
          dataIndex: 'name',
          key: 'name',
          fixed: 'left',
        },
        {
          title: 'Age',
          width: 100,
          dataIndex: 'age',
          key: 'age',
          fixed: 'left',
        },
        {
          title: 'Column 1',
          dataIndex: 'address',
          key: '1',
          width: 150,
        },
        {
          title: 'Column 2',
          dataIndex: 'address',
          key: '2',
          width: 150,
        },
        {
          title: 'Column 3',
          dataIndex: 'address',
          key: '3',
          width: 150,
        },
        {
          title: 'Column 4',
          dataIndex: 'address',
          key: '4',
          width: 150,
        },
        {
          title: 'Column 5',
          dataIndex: 'address',
          key: '5',
          width: 150,
        },
        {
          title: 'Column 6',
          dataIndex: 'address',
          key: '6',
          width: 150,
        },
        {
          title: 'Column 7',
          dataIndex: 'address',
          key: '7',
          width: 150,
        },
        { title: 'Column 8', dataIndex: 'address', key: '8' },
        {
          title: 'Action',
          key: 'operation',
          fixed: 'right',
          width: 100,
          render: () => <span>action</span>,
        },
      ];
      
      const data3 = [];
      for (let i = 0; i < 100; i++) {
        data3.push({
          key: i,
          name: `Edrward ${i}`,
          age: 32,
          address: `London Park no. ${i}`,
        });
      }

    
    return (
      <div style={{ height: '100%', overflowY: 'scroll' }}>
          <h1>Table表格：筛选和排序</h1>
          <Divider/>
          <Table dataSource = { data1 } columns={ columns1 } onChange={ onChange } />
          <Divider/>
          <h1>Table表格：添加边框，页头，页脚</h1>
          <Divider/>
          <Table dataSource = { data2 } columns={ columns2 } bordered title={ () => 'Header' } footer={ () => 'footer' }  />
          <h1>Table表格：固定表头和固定列</h1>
          <Divider/>
          <Table columns={ columns3 } dataSource={ data3 } pagination={{ pageSize: 50 }} scroll={{ x: 1500, y: 300 }} />

      </div>
    );
}

export default MyTable;
