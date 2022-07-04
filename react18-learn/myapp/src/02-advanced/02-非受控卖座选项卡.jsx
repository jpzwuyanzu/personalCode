import React, { Component } from "react";
import Film from "./maizuocomponent/Film";
import Cinema from "./maizuocomponent/Cinema";
import Center from "./maizuocomponent/Center";
import TabBar from './maizuocomponent/TabBar';
import NavBar from './maizuocomponent/NavBar'
import "./css/02-maizuo.css";

class App extends Component {

 state = {
     current: 0
 }
  render() {
    return (
      <div>
          <NavBar myEvenet={ () => {
              console.log('nabbar')
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
        } }></TabBar>
      </div>
    );
  }
}

export default App;
