import React, { Component } from 'react'
import { connect } from 'react-redux'

const mapStateToProps = (state) => { //state是全局的状态状态数据
    return { 
        list: state.list  //在组件中通过this.props.list获取到数据
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        removeItem (index) {
            dispatch({
                type: 'REMOVE_ITEM',
                payload: index
            })
        }
    }
}

@connect(mapStateToProps, mapDispatchToProps)
 class List extends Component {
    removeData = (index) => {
        return () => {
            this.props.removeItem(index)
        }
    }
    render() {
        return (
            <ul>
                {
                    this.props.list.map ((item, index) => {
                     return   <li key = { index }>
                      { item }
                     <button onClick = { this.removeData(index) }>删除</button>
                     </li>
                    })
                }
            </ul>
        )
    }
}



export default List

