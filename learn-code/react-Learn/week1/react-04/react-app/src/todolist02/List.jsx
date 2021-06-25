import React, { Component } from 'react';
import { connect } from 'react-redux'

class List extends Component {
    handlerDelete = (index) => {
       return () => {
        this.props.removeItem(index)
       }
    }
    render() {
        return (
            <ul>
                { this.props.list.map((item,index) => {
                 return   <li key={ index }>{ item } <button onClick={ this.handlerDelete(index) }>删除</button></li>
                }) }
            </ul>
        );
    }
}


const mapStateToProps = (state) => { //state参数为全局state
    return { list :  state.list} //通过this.props.list获取数据
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem(index) {
            dispatch({type:'REMOVE_ITEM',index})
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(List);
