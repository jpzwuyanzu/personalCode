import React, { Component } from 'react'

export default class VanInput extends Component {
    state = {
        word: ''
    }
    changeHandler(e) {
        
        this.setState({
            word: e.target.value
        }, () => {
            this.props.reciveValue(this.state.word, e.target.name)
        })
    }
    render() {
        return (
            <>
                <div>
                    <input type={ this.props.type } 
                    placeholder={ this.props.placeholder } 
                    reg={ this.props.reg } 
                    errmsg={ this.props.errmsg }
                    value={ this.state.word }
                    name={ this.props.name }
                    onChange = { this.changeHandler.bind(this) }
                    />
                </div>
            </>
        )
    }
}
