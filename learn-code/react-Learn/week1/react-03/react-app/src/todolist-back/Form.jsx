import React, { Component } from 'react';

class Form extends Component {
    state = {
        keyword: ''
    }
    handlerChange(e) {
        this.setState({
            keyword: e.target.value
        })
    }
    handlerKeyUp(e) {
        if(e.keyCode === 13) {
         this.props.onRecieveKeyword(this.state.keyword)
         this.setState({keyword: ''})
        }
    }
    render() {
        return (
            <input type="text" value={ this.state.keyword } onChange={ this.handlerChange.bind(this) } onKeyUp={ this.handlerKeyUp.bind(this) } />
        );
    }
}

export default Form;
