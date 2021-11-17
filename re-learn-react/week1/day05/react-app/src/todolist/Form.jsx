import React, { Component } from 'react'

export default class Form extends Component {
    state = {
        keyword: ''
    }
    handlerChange (e) {
        this.setState({
            keyword: e.target.value
        })
    }
    handlerKeyup (e) {
        if(e.keyCode === 13) {
            //传值给父组件, 通过props实现
            this.props.onReceiveKeyWord(this.state.keyword)
            this.setState({ keyword: '' })
        }
    }
    render() {
        return (
            <>
             <input type="text" value= { this.state.keyword }
             onChange = { this.handlerChange.bind(this) }
             onKeyUp = { this.handlerKeyup.bind(this) }
             />
             {this.state.keyword}
            </>
        )
    }
}
