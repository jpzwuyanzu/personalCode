import React, { Component } from "react";
import MySwiper from "./swiper/Swiper";
import MySwiperItem from "./swiper/SwiperItem";

export default class App extends Component {
  state = {
    list: [],
  };

  componentDidMount() {
    //模拟异步获取数据，渲染轮播组件
    setTimeout(() => {
      this.setState({
        list: ["aaa", "bbbb", "cccc"],
      });
    }, 1000);
  }

  render() {
    return (
      <div>
        <MySwiper>
          {this.state.list.map((item) => (
            <MySwiperItem key={item}>{item}</MySwiperItem>
          ))}
          {/* <MySwiperItem>1111</MySwiperItem>
          <MySwiperItem>2222</MySwiperItem>
          <MySwiperItem>3333</MySwiperItem> */}
        </MySwiper>
      </div>
    );
  }
}
