import React, { Component } from "react";
import axios from "axios";
import "./css/03-communination.css";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      filmList: [],
      info: ""
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
          <FilmItem key={item.filmId} {...item} onEvent= { (value) => {
            // console.log('父组件接', value)
            this.setState({
                info: value
            })
          } }></FilmItem>
        ))}
        <FilmDetail info={ this.state.info }></FilmDetail>
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
          this.props.onEvent(synopsis)
      } }>
        <img src={poster} alt={name} />
        <h4>{name}</h4>
        <div> { grade }</div>
      </div>
    );
  }
}

class FilmDetail extends Component {
    render() {
        return (
            <div className="FilmDetail">
                { this.props.info }
            </div>
        )
    }
}
