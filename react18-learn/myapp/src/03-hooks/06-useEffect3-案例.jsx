import React, { Component, useEffect } from "react";

const Child = () => {


  // useEffect 中return一个函数清除定时器等副作用 
  useEffect(() => {
    window.onresize = () => {
      console.log("resize");
    };
    return () => {
      window.onresize = null;
    };
  }, []);

  return <div>child</div>;
};

export default class App extends Component {
  state = {
    isCreated: true,
  };

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.setState({
              isCreated: !this.state.isCreated,
            });
          }}
        >
          button
        </button>
        {/* { this.state.isCreated ? <Child/> : '' } */}
        {this.state.isCreated && <Child />}
      </div>
    );
  }
}
