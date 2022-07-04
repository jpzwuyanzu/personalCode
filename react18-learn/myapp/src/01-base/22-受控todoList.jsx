import React, { Component } from "react";

class App extends Component {
//   myRef = React.createRef();
  state = {
    list: [
      {
        id: 1,
        text: "aaa",
        isChecked: false
      },
      {
        id: 2,
        text: "bbbb",
        isChecked: true
      },
      {
        id: 3,
        text: "ccc",
        isChecked: false
      },
    ],
    myText: ''
  };

  handleClick = () => {
    //不要直接修改状态， 可能会造成不可预期的问题
    let newList = [...this.state.list];
    newList.push({
      id: Math.random() * 100000,
      text: this.state.myText,
      isChecked: false
    });

    this.setState({
      list: newList,
      myText: '' //清空输入款的值
    });
  };

  handelDelClick = (id, index) => {
    let newList = this.state.list.slice();
    newList.splice(index, 1);
    this.setState({
      list: newList,
    });
  };

  handleChecked = (index) => {
      console.log(index)
      let newList = this.state.list.slice();
      newList[index].isChecked = !newList[index].isChecked
      this.setState({
        list: newList
      })
  }
  render() {
    return (
      <div>
        <input value={ this.state.myText } onChange={ (evt) => {
            this.setState({
                myText: evt.target.value
            })
        }} />
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
              <input type="checkbox" checked={ item.isChecked }  onChange={ () =>  this.handleChecked(index) }/>
              {/* 富文本展示 */}
              {/* <span dangerouslySetInnerHTML={{__html: item.text}}></span> */}
              <span style={{ textDecoration: item.isChecked ? 'line-through' : 'none'  }}>{item.text}</span>
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
