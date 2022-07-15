import React, { Component } from "react";
import Swiper, { Navigation, Pagination } from "swiper";
import "swiper/css/bundle";
Swiper.use([Navigation, Pagination]);

export default class MySwiper extends Component {
  componentDidMount() {
    new Swiper(".swiper", {
      pagination: {
        el: ".swiper-pagination",
      },
    });
  }

  render() {
    return (
      <div>
        <div className="swiper">
          <div className="swiper-wrapper">
            {this.props.children}
          </div>
          <div className="swiper-pagination"></div>
        </div>
      </div>
    );
  }
}
