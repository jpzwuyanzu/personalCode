import React, { Component } from 'react';
import Form from './Form'
import List from './List'
//非受控组件
class Todolist extends Component {
    state = {
        keyword:''
    }
    handlerChange(keyword){
        console.log(keyword)
        this.setState({keyword : keyword})
    }
    render() {
        return (
            <div>
                <Form onReceiveChange={ this.handlerChange.bind(this) }></Form>
                <List keyword = { this.state.keyword }></List>
            </div>
        );
    }
}

export default Todolist;
