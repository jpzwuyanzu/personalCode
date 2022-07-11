import React, { Component } from 'react'

class NavBar extends Component {
    render() {
        return (
            <div style={{ background: 'red' }}>
                { this.props.children }
                <span>navbar</span>
            </div>
        )
    }
}

class SideBar extends Component {
    render() {
        return (
            <div style={{ background: 'yellow', width: '200px'}}>
                <ul>
                    <li>1212</li>
                    <li>1212</li>
                    <li>1212</li>
                    <li>1212</li>
                    <li>121212</li>
                </ul>
            </div>
        )
    }
}

class App extends Component {
    state = {
        isShow: true
    }
    render() {
        return (
            <div>
                <NavBar>
                <button onClick={ () => {
                    this.setState({
                        isShow: !this.state.isShow
                    })
                }  }>click</button>
                </NavBar>
                { this.state.isShow &&  <SideBar></SideBar> }
                
            </div>
        )
    }
}

/**
 * 父传子通过属性
 * 
 * 子传父通过事件回调函数 callback
 */

export default App;
