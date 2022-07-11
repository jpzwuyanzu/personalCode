import React, { Component } from "react";

class Field extends Component {
  render() {
    return (
      <div style={{ background: "yellow" }}>
        <label>{this.props.label}</label>
        <input
          type={this.props.type}
          onChange={(e) => {
            this.props.onChangeEvent(e.target.value);
          }}
          value={ this.props.value }
        />
      </div>
    );
  }
}

export default class App extends Component {
  state = {
    username: localStorage.getItem('username'),
    password: "",
  };

  render() {
    return (
      <div>
        <h1>登录页面</h1>
        <Field
          label="用户名"
          type="text"
          value={ this.state.username }
          onChangeEvent={(value) => {
            this.setState({
              username: value,
            });
          }}
        />
        <Field
          label="密码"
          type="password"
          onChangeEvent={(value) => {
            this.setState({
              password: value,
            });
          }}
        />
        <button
          onClick={() => {
            console.log(
              "username:",
              this.state.username,
              "password:",
              this.state.password
            );
          }}
        >
          登录
        </button>
        <button onClick={ () => {
            this.setState({
                username: '',
                password: ''
            })
        } }>取消</button>
      </div>
    );
  }
}
