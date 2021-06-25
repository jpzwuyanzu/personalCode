import React, { Component } from 'react';

class App extends Component {
    state = {
        list:[]
    }
    componentDidMount() {
        // fetch 数据请求，无需安装
        // 返回的值为一个promise对象--需要转换成json对象
        //供程序调用
        //pro.json放在public目录下
        fetch('/pro.json').then( res => res.json()).then(result => {
            console.log(result)
            this.setState({
                list : result.result
            })
        })
    }
    render() {
        return (
           <ul>
               {
                   this.state.list.map( item => 
                       <li key = { item.positionId }>{ item.city }</li>
                   )
               }
               
           </ul>
        );
    }
}

export default App;
