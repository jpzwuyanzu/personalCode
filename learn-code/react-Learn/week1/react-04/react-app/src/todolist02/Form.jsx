import React, { Component } from 'react';
import { connect } from 'react-redux';

class Form extends Component {
    state = {
        keyword:''
    }
    handlerChange = (e) => {
        this.setState({ keyword: e.target.value })
    }
    handlerKeyUp = (e) => {
        if(e.keyCode === 13) {
            this.props.addItem(this.state.keyword)
            this.setState({keyword:''})
        }
    }
    render() {
        return (
                <input 
                type="text"
                value = { this.state.keyword }
                onChange = { this.handlerChange }
                onKeyUp = { this.handlerKeyUp }
                />
        );
    }
}

//为了把业务逻辑传入到展示组件中
const mapDispatchToProps = (dispatch) => { //dispatch是该函数的默认参数
    return {
        addItem(data) { //可以在组件中通过this.props.addItem(params)调用
            dispatch({
                type:'ADD_ITEM',
                data
            })
        }
    }
}

export default connect(null, mapDispatchToProps)(Form);
