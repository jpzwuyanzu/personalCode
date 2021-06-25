import React, { Component } from 'react';

class List extends Component {
    state = {
        list:['list1','list2']
    }
    handlerDelClick(index){
        this.state.list.splice(index,1)
        this.setState({list: this.state.list})
    }
    //REACT生命周期函数
    UNSAFE_componentWillReceiveProps(props) {
        this.setState({
            list: [...this.state.list, props.keyword]
        })
    }
    render() {
        return (
           <ul>
               { this.state.list.map((item,index) => {
                   return (
                    <li key={index}>{item}<button onClick={ this.handlerDelClick.bind(this,index) }>删除</button></li>
                   )
               }) }
           </ul>
        );
    }
}

export default List;
