import React, { useEffect, useState } from 'react'
import { InfiniteScroll, List } from 'antd-mobile'
import styles from './NowPlaying.module.scss'


export default function NowPlaying() {
    const [data, setData] = useState<string[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const loadMore = async () => {
        // 向后端请求数据
        const append = ['1','2','3']
        setData(val => [...val, ...append]);
        if(append.length > 0) {
            console.log('加载更多')
        }
        setHasMore(append.length > 0)
       
    }
    return (
        <div className={ styles.homeList_content }>
          <List>
            {data.map((item, index) => (
            <List.Item key={index}>{item}</List.Item>
            ))}
        </List>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={0} /> 
        </div>
    )
}
