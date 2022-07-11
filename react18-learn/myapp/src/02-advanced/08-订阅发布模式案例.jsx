import React, { Component } from "react";
import axios from "axios";
import "./css/03-communination.css";
/**
 * 发布订阅模式
 */
//调度中心
var bus = {

    list: [],
    //订阅
    subscribe(callback) {
        this.list.push(callback)
    },
    //发布
    publish(text) {
        //将回调函数执行
        this.list.forEach((callback => {
            callback && callback(text)
        }))
    }
}

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      filmList: [],
    };
    axios.get("/test.json").then((res) => {
    //   console.log(res.data.data.films);
      this.setState({
        filmList: res.data.data.films,
      });
    });
  }

  render() {
    return (
      <div>
        {this.state.filmList.map((item) => (
          <FilmItem key={item.filmId} {...item}></FilmItem>
        ))}
        <FilmDetail></FilmDetail>
      </div>
    );
  }
}

//受控组件
class FilmItem extends Component {
  render() {
    // console.log(this.props);
    let { name, poster, grade, synopsis } = this.props;
    return (
      <div className="FilmItem"  onClick={ () => {
        //   console.log(synopsis)
          bus.publish(synopsis)
      } }>
        <img src={poster} alt={name} />
        <h4>{name}</h4>
        <div> { grade }</div>
      </div>
    );
  }
}

class FilmDetail extends Component {
    constructor() {
        super()
        this.state = {
            info: ''
        }
        bus.subscribe((info) => {
            // console.log('filmDetail中订阅', info)
            this.setState({
                info
            })
        })
    }

    render() {
        return (
            <div className="FilmDetail">
                { this.state.info }
            </div>
        )
    }
}
