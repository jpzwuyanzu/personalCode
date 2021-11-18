import React, { Component } from 'react'

export default class Form extends Component {
    state = {
        keyword: ''
    }

    constructor (props) {
        super(props)
        this.input = React.createRef()
    }

    handlerChange() {
        this.setState({
            keyword: this.input.current.value
        })
    }
    handlerKeyUp(e) {
        if(e.keyCode === 13) {
            this.props.onReceiveData(this.state.keyword)
            // this.setState({ keyword: '' })
            this.input.current.value = ''
        }
    }
    render() {
        return (
            <div>
                <input 
                type="text" 
                ref={ this.input } 
                onChange= { this.handlerChange.bind(this) }
                onKeyUp = { this.handlerKeyUp.bind(this) }
                 />
            </div>
        )
    }
}
