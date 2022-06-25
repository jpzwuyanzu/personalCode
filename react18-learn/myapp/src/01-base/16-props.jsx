import React, { Component } from "react";
import NavBar from "./NavBar/index";

class App extends Component {
  render() {

    //从父组件传递来的
    var obj = {
      title: '测试',
      leftShow: false
    }

    return (
      <div>
        <div>
          <h2>首页</h2>
          <NavBar title="首页" leftShow={ false }></NavBar>
        </div>
        <div>
          <h2>列表</h2>
          <NavBar title="列表"></NavBar>
        </div>
        <div>
          <h2>购物车</h2>
          <NavBar title="购物车"></NavBar>
        </div>
        {/* 简写属性，因为属性名称相同 */}
        <NavBar { ...obj }></NavBar>
      </div>
    );
  }
}

export default App;
