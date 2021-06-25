import React, { Component } from 'react';

//受控组件
class Form extends Component {
    state = {
        keyword:''
    }
    handlerChange(e) {
        this.setState({
            keyword: e.target.value
        })
    }
    handlerKeyUp(e) {
        if(e.keyCode === 13) {
            //传值给父组件,通过调用父组件的props中的事件
            this.props.onReceiveKeyWord(e.target.value)
            this.setState({ keyword: '' })
        }
    }
    render() {
        return (
           <>
             <input type="text" 
            value={ this.state.keyword }
            onChange = { this.handlerChange.bind(this) }
            onKeyUp = { this.handlerKeyUp.bind(this) }
            />
            { this.state.keyword }
           </>
        );
    }
}

export default Form;
