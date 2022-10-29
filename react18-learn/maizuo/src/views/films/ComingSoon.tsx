import React, { useEffect, useState } from 'react'
import { InfiniteScroll, List, Image, Button } from 'antd-mobile'
import axios from 'axios'
import styles from './NowPlaying.module.scss'

export default function ComingSoon() {
    const [data, setData] = useState<string[]>([]);
    const [hasMore, setHasMore] = useState(false);
    const [pageNum, setPageNum] = useState(1);
    const loadMore = async () => {
        // 向后端请求数据
        const res = await axios({
            url: `https://m.maizuo.com/gateway?cityId=440300&pageNum=${pageNum}&pageSize=10&type=2&k=3099232`,
            headers: {
                "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.2.1","e":"1660210801174002010062849"}',
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
        <div className={ styles.film_contianer }>
            <div className={ styles.homeList_content }>
          <List>
            {data.map((item: any, index) => (
            <List.Item 
            key={index}
            prefix={
                <Image
                  src={item.poster}
                  fit='cover'
                  width={66}
                  height={92}
                />
            }
            description={
                <div className={ styles.film_right_part }>
                    <div className={ styles.film_desc }>
                        <div className={styles.detail}>观众评分<span className={ styles.grade }>{item.grade}</span></div>
                        <div className={styles.detail}>导演：{item.director}</div>
                        <div className={styles.detail}>{item.nation} | {item.runtime}分钟</div>
                    </div>
                </div>
            }>
                <div className={ styles.film_title }>
                    <span className={ styles.film_name }>{ item.name }</span><span className={ styles.film_type }>{ item.item.name }</span>
                </div>
            </List.Item>
            ))}
        </List>
        <InfiniteScroll loadMore={loadMore} hasMore={hasMore} threshold={0} /> 
        </div>
        </div>
    )
}
