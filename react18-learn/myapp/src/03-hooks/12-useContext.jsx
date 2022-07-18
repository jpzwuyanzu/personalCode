import React, { Component } from "react";
import axios from "axios";
import "./../02-advanced/css/03-communination.css";

const GloabalContext = React.createContext(); //创建context对象

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      filmList: [],
      info: "",
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
      <GloabalContext.Provider
        value={{
          call: "test---",
          sms: "短信",
          info: this.state.info,
          changeInfo: (value) => {
            this.setState({
              info: value
            })
          }
        }}
      >
        <div>
          {this.state.filmList.map((item) => (
            <FilmItem key={item.filmId} {...item}></FilmItem>
          ))}
          <FilmDetail></FilmDetail>
        </div>
      </GloabalContext.Provider>
    );
  }
}

//受控组件
class FilmItem extends Component {
  render() {
    // console.log(this.props);
    let { name, poster, grade, synopsis } = this.props;
    return (
      <GloabalContext.Consumer>
        {(value) => {
          return (
            <div
              className="FilmItem"
              onClick={() => {
                console.log(synopsis);
                value.changeInfo(synopsis)
              }}
            >
              <img src={poster} alt={name} />
              <h4>{name}</h4>
              <div> {grade}</div>
            </div>
          );
        }}
      </GloabalContext.Consumer>
    );
  }
}

class FilmDetail extends Component {
  render() {
    return (
      <GloabalContext.Consumer>
        {(value) => <div className="FilmDetail">{value.info}</div>}
      </GloabalContext.Consumer>
    );
  }
}
