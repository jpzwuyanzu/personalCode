import React, { Component } from 'react';
import Form from './Form';
import List from './List';


class Todolist extends Component {
    state = {
        keyword: ''
    }
    handlerRecieve(val) {
        console.log(val)
        this.setState({keyword: val})
    }
    render() {
        return (
            <>
            <Form onRecieveKeyword={ this.handlerRecieve.bind(this) }/>
            <List keyword={ this.state.keyword }/>
            </>
        );
    }
}

export default Todolist;
