import React, { Component } from 'react';

class List extends Component {
    state = {
        list: ['tab1','tab2']
    }
    hendleClick(index){
        //删掉对应的项
        this.state.list.splice(index,1)
        //重新更新数组
        this.setState({
            list: this.state.list
        })
    }
    //react的生命周期钩子函数
    componentWillReceiveProps (props) {
        //这里是
        console.log(props)
        this.setState({
            // 扩展运算符相当于是深拷贝
            list: [...this.state.list, props.keyWord]
        })
    }

    render() {
        return (
            <ul>
                {/* 列表遍历使用map方法 */}
                { this.state.list.map((item,index) => {
                    return  (<li key={index}>{ item } <button onClick={ this.hendleClick.bind(this,index) }>删除</button></li>)
                }) }
            </ul>
        );
    }
}

export default List;
