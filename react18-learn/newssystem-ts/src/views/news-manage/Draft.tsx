import React from 'react'
import { Table } from 'antd'

export default function Draft() {
    const dataSource = [
        {
          key: '1',
          title: '测试新闻001',
          content: '新闻内容001',
          date: '1665822159338',
        },
        {
            key: '2',
            title: '测试新闻002',
            content: '新闻内容002',
            date: '1665822270531',
          }
      ];
      
      const columns: any = [
        {
          title: '新闻标题',
          dataIndex: 'title',
          key: 'title',
          align: 'center'
        },
        {
          title: '新闻内容',
          dataIndex: 'content',
          key: 'content',
          align: 'center'
        },
        {
          title: '日期',
          dataIndex: 'date',
          key: 'date',
          align: 'center'
        },
      ];
    return (
        <>
            <Table dataSource={dataSource} columns={columns}/>
        </>
    )
}
