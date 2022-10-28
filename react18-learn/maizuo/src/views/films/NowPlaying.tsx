import React, { useEffect, useState } from 'react'
import { InfiniteScroll, List } from 'antd-mobile'
import axios from 'axios'
import styles from './NowPlaying.module.scss'


export default function NowPlaying() {
    const [data, setData] = useState<string[]>([]);
    const [hasMore, setHasMore] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const loadMore = async () => {
        // 向后端请求数据
        const res = await axios({
            url: `https://m.maizuo.com/gateway?cityId=310100&pageNum=${pageNum}&pageSize=10&type=1&k=2984491`,
            headers: {
                "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.2.0","e":"16558863921792667809742849"}',
                "X-Host": "mall.film-ticket.film.list"
            }
        })
        setData(val => [...val, ...res.data.data.films]);
        setHasMore(res.data.data.films.length > 0)
        setPageNum(pageNum+1)
    }

    useEffect(() => {
        loadMore()
        // eslint-disable-next-line
    }, [])
    return (
        <div className={ styles.homeList_content }>
          <List>
            {data.map((item: any, index) => (
            <List.Item key={index}>{item.name}</List.Item>
            ))}
        </List>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={0} /> 
        </div>
    )
}
