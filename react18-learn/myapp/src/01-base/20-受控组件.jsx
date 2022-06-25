import React, { Component } from 'react'

export default class App extends Component {

    
    state =  {
        username: 'aaa'
    }

    
    render() {
        return (
            <div>
                <h1>登录</h1>
                {/* input此时的值手react的控制，就是受控组件 */}
                <input type="text"  value={ this.state.username } onChange={ (e) => { 
                    this.setState({
                        username: e.target.value
                    })
                 } } />
                <button onClick={ () => {
                    console.log(this.state.username)
                } }>登录</button>
                <button onClick={ () => {
                    this.setState({
                        username: ''
                    })
                } }>重置</button>
            </div>
        )
    }
}
