import React, { Component } from "react";
import Swiper, { Navigation, Pagination } from "swiper";
import "swiper/css/bundle";
Swiper.use([Navigation, Pagination]);

export default class App extends Component {
  state = {
    list: [],
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({
        list: ["111", "222", "3333"],
      });
    }, 1000);
  }

  componentDidUpdate() {
    new Swiper(".swiper", {
      pagination: {
        el: ".swiper-pagination",
      },
    });
  }
  render() {
    return (
      <div>
        <div
          className="swiper"
          style={{ height: "200px", background: "yellow" }}
        >
          <div className="swiper-wrapper">
            {this.state.list.map((item) => (
              <div className="swiper-slide" key={item}>
                {item}
              </div>
            ))}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    );
  }
}
