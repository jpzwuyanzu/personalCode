import React, { Component } from "react";
import Film from "./maizuocomponent/Film";
import Cinema from "./maizuocomponent2/Cinema";
import Center from "./maizuocomponent2/Center";
import TabBar from './maizuocomponent2/TabBar';
import NavBar from './maizuocomponent2/NavBar'
import "./css/02-maizuo.css";

class App extends Component {

 state = {
     current: 0,
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
 }
  render() {
    return (
      <div>
          <NavBar myEvenet={ () => {
              console.log('nabbar')
              this.setState({
                  current: 2
              })
          } }></NavBar>
        {
            this.state.current === 0 ? <Film></Film> : (this.state.current === 1 ? <Cinema></Cinema> : <Center></Center>)
        }
        {/* {this.which()} */}
        <TabBar event={ (index) => {
            console.log('父组件定义', index)
            this.setState({
                current: index
            })
        } } current={ this.state.current } list={ this.state.list }></TabBar>
      </div>
    );
  }
}

export default App;
