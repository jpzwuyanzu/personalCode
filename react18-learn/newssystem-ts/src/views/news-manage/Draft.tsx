import React from 'react'
import { Table } from 'antd'

export default function Draft() {
    const dataSource = [
        {
          key: '1',
          title: '测试新闻001',
          content: '新闻内容001',
          date: '1665822159338',
          id: 11
        },
        {
            key: '2',
            title: '测试新闻002',
            content: '新闻内容002',
            date: '1665822270531',
            id: 22
          }
      ];
      
      const columns: any = [
        {
          title: '新闻标题',
          key: 'title',
          align: 'center',
          render: (item: any) => {
              return <a href={ `/#/news-manage/preview/${item.id}` }>{item.title}</a>
          }
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
