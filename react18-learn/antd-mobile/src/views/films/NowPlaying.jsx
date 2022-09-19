/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from 'react-router-dom'
import axios from "axios";
import FilmItem from "./FileItem";
import { connect } from "react-redux";
import { List, Image, InfiniteScroll } from "antd-mobile";
import { show } from "./../../06-Redux/redux/actionCreator/tabbarActionCreator";

function NowPlaying(props) {
  const [list, setList] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const count = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    props.showTab();
    // axios({
    //   url: "https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=5199589",
    //   headers: {
    //     "X-Client-Info":
    //       '{"a":"3000","ch":"1002","v":"5.2.0","e":"16558863921792667809742849","bc":"110100"}',
    //     "X-Host": "mall.film-ticket.film.list",
    //   },
    // }).then((res) => {
    //   setList(res.data.data.films);
    // });
  }, []);
  const handleChangePage = (id) => {
      navigate(`/detail/${id}`)
  }
  const loadMore =  () => {
    count.current++
    setHasMore(false)
    axios({
        url: `https://m.maizuo.com/gateway?cityId=110100&pageNum=${count.current}&pageSize=10&type=1&k=5199589`,
        headers: {
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.2.0","e":"16558863921792667809742849","bc":"110100"}',
          "X-Host": "mall.film-ticket.film.list",
        },
      }).then((res) => {
        setList([...list, ...res.data.data.films]);
        setHasMore(res.data.data.films.length > 0)
      });
  };

  return (
    <div>
      <List>
        {list.map((item) => (
          <List.Item
            onClick={() => {
                handleChangePage(item.filmId)
            }}
            key={item.filmId}
            prefix={
              <Image
                src={item.poster}
                // style={{ borderRadius: 20 }}
                // fit='cover'
                width={80}
                // height={40}
              />
            }
            description={
              <div>
                <div>类型：{item.category}</div>
                <div>导演：{item.director}</div>
                <div>国家：{item.nation}</div>
                <div>{item.synopsis}</div>
              </div>
            }
          >
            {item.name}
          </List.Item>
        ))}
      </List>
      <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
    </div>
  );
}

export default connect(null, (dispatch) => ({
  showTab() {
    dispatch({
      type: "show",
    });
  },
}))(NowPlaying);
