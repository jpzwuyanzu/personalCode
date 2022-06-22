import React, { Component } from 'react'

 class App extends Component {

    // state = {
    //     isLike: true,
    //     text: '收藏'
    // }
    
    constructor() {
        super() //构造函数必须使用super()来获取this
        this.state = {
            isLike: true,
            text: '收藏',
            myname: 'tony'
        }
    }

    render() {
        return (
            <div>
               <h1>欢迎来到react开发 { this.state.myname }</h1>
               <button onClick={ () => {
                   // 不要直接修改状态，需要使用setState()修改状态
                   this.setState({
                    isLike: !this.state.isLike,
                    myname: !this.state.isLike ? 'xiaoming' : 'tony'
                   }) // 间接修改状态
                   if(this.state.isLike) {
                       console.log('收藏逻辑')
                   }else {
                       console.log('取消收藏的逻辑')
                   }
               } }>{ this.state.isLike ? '收藏' : '取消收藏' }</button>
            </div>
        )
    }
}

export default App;