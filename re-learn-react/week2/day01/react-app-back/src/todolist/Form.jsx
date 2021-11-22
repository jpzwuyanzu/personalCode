import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch) => {
    return {
        addItem (payload) {
            dispatch({
                type: 'ADD_ITEM',
                payload
            })
        }
    }
}


@connect(null, mapDispatchToProps)
 class Form extends Component {
    state = {
        keyword: ''
    }
    changeHandler = (e) => {
        this.setState({
            keyword: e.target.value
        })
    }
    handlerKeyUp = (e) => {
        if(e.keyCode === 13) {
            console.log('enter')
            this.props.addItem(this.state.keyword)
            this.setState({
                keyword: ''
            })
        }
    }
    render() {
        return (
            <input type="text"
            value = { this.state.keyword }
            onChange = { this.changeHandler }
            onKeyUp = { this.handlerKeyUp }
            />
        )
    }
}

export default Form