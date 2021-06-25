import React, { Component } from 'react';
import { connect } from 'react-redux'

const mapDispatchToProps = (dispatch) => {
    return {
        addItem(data) {
            dispatch({
                type:'ADD_ITEM',
                data
            })
        }
    }
}

@connect(null, mapDispatchToProps)
class Form extends Component {
    handlerChange = (e) => {
        this.setState({ keyword : e.target.value })
    }
    handlerKeyUp = (e) => {
        if(e.keyCode === 13) {
            //将数据添加到list中
            this.props.addItem(this.state.keyword)
            this.setState({keyword: ''})
        }
    }
    render() {
        return (
            <input type="text"
                value = { this.keyword }
                onChange = { this.handlerChange }
                onKeyUp  = { this.handlerKeyUp }
            />
        );
    }
}



export default Form;
