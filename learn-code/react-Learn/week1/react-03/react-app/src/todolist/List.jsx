import React, { Component } from 'react';

class List extends Component {
    state = {
        list:[]
    }
    // UNSAFE_componentWillReceiveProps(props) {
    //     //这里是一个深拷贝的操作
    //     console.log(props)
    //     this.setState({
    //         list: [...this.state.list, props.keyword]
    //     })
    // }
    componentDidUpdate(prevProps,prevState) { //updated
        console.log('prevProps', prevProps);
        console.log('prevState', prevState);
        console.log('props', this.props);
        // 要修改数据，必须添加判断条件，没有判断条件就会内存溢出
        if(prevProps.keyword !== this.props.keyword ) {
            this.setState({
                list: [...this.state.list, this.props.keyword]
            })
        }
    }
    handlerDelete(index){
        this.state.list.splice(index,1)
        this.setState({
            list:this.state.list
        })
    }
    render() {
        return (
            <div>
               <ul>
                   {this.state.list.map((item,index) => {
                       return <li key={ index }>{ item }
                       <button onClick={ this.handlerDelete.bind(this,index) }>删除</button>
                       </li>
                   })}
                </ul> 
            </div>
        );
    }
}

export default List;
