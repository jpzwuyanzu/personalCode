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
    handlerKeyUp (e) {
        if(e.keyCode === 13) {
            this.props.onReceiveKeyWord(this.state.keyword)
            this.setState({
                keyword: ''
            })
        }
    }
    render() {
        return (
            <>
                <div>
                    <input type="text" value= { this.state.keyword } onChange = { this.handlerChange.bind(this) } onKeyUp = { this.handlerKeyUp.bind(this) } />
                </div>
            </>
        )
    }
}
