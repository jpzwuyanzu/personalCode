import React, { Component } from 'react';
import { connect} from 'react-redux'

const mapStateToProps = (state) => {
    return { list: state.list }
}

const mapDispatchToProps = (dispatch) => {
    return {
        delItem(index) {
            dispatch({type:'DEl_ITEM',index})
        }
    }
}

@connect(mapStateToProps,mapDispatchToProps)
class List extends Component {
    handlerDelete = (index) => {
        return () => {
            this.props.delItem(index)
        }
    }
    render() {
        return (
            <ul>
                { this.props.list.map((item,index) => {
                   return (
                    <li key = {index}>
                        { item }
                        <button onClick = { this.handlerDelete(index) }>删除</button>
                    </li>
                   )
                }) }
            </ul>
        );
    }
}



export default List
