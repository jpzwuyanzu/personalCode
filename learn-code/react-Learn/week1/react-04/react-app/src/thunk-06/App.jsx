import React, { Component } from 'react';
import { connect } from 'react-redux'
import { getListAction } from './store/actionCreator'



// 异步操作在组件
@connect( state => ({list: state.list}), dispatch => ({
    getList() {
        dispatch(getListAction())
        // dispatch(getListAction) 得看actionCreator的写法
    }
}) )
class App extends Component {

    componentDidMount() {
        this.props.getList()
    }

    render() {
        const {list} = this.props
        return (
            <ul>
                 { 
                 list && list.map( item => (
                  <li key = { item.positionId }> { item.positionName }</li>
                 ))
                 }
            </ul>
        );
    }
}

export default App;
