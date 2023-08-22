import React, { useEffect, useState } from "react";
import { InfiniteScroll, List, Image, Button } from "antd-mobile";
import axios from "axios";
import PageLoading from "../../components/PageLoading";
import SwiperCom from '../../components/SwiperCom'
import styles from "./index.module.scss";
import { useNavigate } from 'react-router-dom'

export default function Index() {
  const navigate = useNavigate();
  const [data, setData] = useState<string[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [pageNum, setPageNum] = useState(1);
  const loadMore = async () => {
    // 向后端请求数据
    const res = await axios({
      url: `https://m.maizuo.com/gateway?cityId=310100&pageNum=${pageNum}&pageSize=10&type=1&k=2984491`,
      headers: {
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.2.0","e":"16558863921792667809742849"}',
        "X-Host": "mall.film-ticket.film.list",
      },
    });
    setData((val) => [...val, ...res.data.data.films]);
    setHasMore(res.data.data.films.length > 0);
    setPageNum(pageNum + 1);
  };

  useEffect(() => {
    loadMore();
    // eslint-disable-next-line
  }, []);
  return (
    <div style={{ height: '100%' }}>
        <SwiperCom/>
    <div className={styles.film_contianer}>
      <div className={styles.homeList_content}>
        {!data.length ? (
          <PageLoading />
        ) : (
          <>
            <List>
              {data.map((item: any, index) => (
                <List.Item
                  key={index}
                  arrow={ false }
                  prefix={
                    <Image
                      src={item.poster}
                      fit="cover"
                      width={66}
                      height={92}
                    />
                  }
                  description={
                    <div className={styles.film_right_part}>
                      <div className={styles.film_desc}>
                        <div className={styles.detail}>
                          观众评分
                          <span className={styles.grade}>{item.grade}</span>
                        </div>
                        <div className={styles.detail}>
                          导演：{item.director}
                        </div>
                        <div className={styles.detail}>
                          {item.nation} | {item.runtime}分钟
                        </div>
                      </div>
                      <Button
                        className={styles.buyNow_btn}
                        color="primary"
                        fill="outline"
                      >
                        购票
                      </Button>
                    </div>
                  }
                  onClick={ () => {
                    navigate(`/film/detail/${item.filmId}`)
                  } }
                >
                  <div className={styles.film_title}>
                    <span className={styles.film_name}>{item.name}</span>
                    <span className={styles.film_type}>{item.item.name}</span>
                  </div>
                </List.Item>
              ))}
            </List>
            <InfiniteScroll
              loadMore={loadMore}
              hasMore={hasMore}
              threshold={0}
            />{" "}
          </>
        )}
      </div>
    </div>
    </div>
  );
}
