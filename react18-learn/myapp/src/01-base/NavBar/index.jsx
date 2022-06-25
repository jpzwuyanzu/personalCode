import React, { Component } from "react";
import myType from "prop-types";

class NavBar extends Component {
  //状态是当前组件的，外部无法改变

  //属性是父组件传递过来的
  static a = 100; //类属性
  b = 1; // 对象属性，需要对象实例话才可以获取

  //类的静态属性
  static propTypes = {
    leftShow: myType.bool,
    title: myType.string,
  };
  //类的默认属性
  static defaultProps = {
    leftShow: true,
  };

  render() {
    //接受属性做验证
    let { title, leftShow } = this.props;
    return (
      <div>
        {leftShow && <button>返回</button>}
        navbar-{title}
        <button>HOME</button>
      </div>
    );
  }
}

//类属性，可以直接访问, 使用props-types库来做属性的类型校验
// NavBar.propTypes = {
//     leftShow: myType.bool,
//     title: myType.string
// }

//类的默认属性
// NavBar.defaultProps = {
//     leftShow: true
// }

export default NavBar;
