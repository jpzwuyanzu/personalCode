import React, { Component } from "react";

class App extends Component {
  myRef = React.createRef();
  state = {
    list: [
      {
        id: 1,
        text: "aaa",
      },
      {
        id: 2,
        text: "bbbb",
      },
      {
        id: 3,
        text: "ccc",
      },
    ],
  };

  handleClick = () => {
    //不要直接修改状态， 可能会造成不可预期的问题
    // this.state.list.push(this.myRef.current.value)
    let newList = [...this.state.list];
    newList.push({
      id: Math.random() * 100000,
      text: this.myRef.current.value,
    });

    this.setState({
      list: newList,
    });
    //清空输入款的值
    this.myRef.current.value = "";
  };

  handelDelClick = (id, index) => {
    let newList = this.state.list.slice();
    newList.splice(index, 1);
    this.setState({
      list: newList,
    });
  };
  render() {
    return (
      <div>
        <input ref={this.myRef} />
        <button
          onClick={() => {
            this.handleClick();
          }}
        >
          add
        </button>
        <ul>
          {this.state.list.map((item, index) => (
            <li key={item.id}>
              {/* 富文本展示 */}
              {/* <span dangerouslySetInnerHTML={{__html: item.text}}></span> */}
              {item.text}
              <button
                onClick={() => {
                  this.handelDelClick(item.id, index);
                }}
              >
                del
              </button>
            </li>
          ))}
        </ul>
        {/* 条件渲染 */}
        {this.state.list.length === 0 && <div>暂无待办事项</div>}
      </div>
    );
  }
}

export default App;
