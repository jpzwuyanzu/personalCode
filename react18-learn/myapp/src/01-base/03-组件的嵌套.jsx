import React, { Component } from 'react'

class Child extends Component {
    render() {
        return <div>32323child</div>
    }
}

class NavBar extends Component {
    render() {
        return (
            <div>NavBar<Child>1212</Child></div>
        )
    }
}
//类组件
class Swiper extends Component {
    render() {
        return <div>Swiper</div>
    }
}
//函数式组件
const Tabbar = ()=> <div>Tabbar</div>

class App extends Component {
    render() {
        return (
            <div>
                <NavBar></NavBar>
                <Swiper></Swiper>
                <Tabbar></Tabbar>
            </div>
        )
    }
}

export default App