import React, { Component } from "react";
import Film from "./maizuocomponent/Film";
import Cinema from "./maizuocomponent/Cinema";
import Center from "./maizuocomponent/Center";
import "./css/02-maizuo.css";

class App extends Component {
  state = {
    list: [
      {
        id: 1,
        text: "电影",
      },
      {
        id: 2,
        text: "影院",
      },
      {
        id: 3,
        text: "我的",
      },
    ],
    current: 0,
  };
  handleClick = (index) => {
    this.setState({
      current: index,
    });
  };

//   which() {
//     switch (this.state.current) {
//       case 0:
//         return <Film></Film>
//         break;
//       case 1:
//         return <Cinema></Cinema>
//         break;
//       case 2:
//         return <Center></Center>
//         break;
//       default:
//         return null;
//     }
//   }

  render() {
    return (
      <div>
        {
            this.state.current === 0 ? <Film></Film> : (this.state.current === 1 ? <Cinema></Cinema> : <Center></Center>)
        }
        {/* {this.which()} */}
        <ul>
          {this.state.list.map((item, index) => (
            <li
              key={item.id}
              className={this.state.current === index ? "active" : ""}
              onClick={() => {
                this.handleClick(index);
              }}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default App;
