import React, { Component } from 'react'

interface IState {
    isShow: Boolean
}

export default class App extends Component<any, IState> {

    state = {
        isShow: true
    }

    render() {
        return (
            <div>
                app
                <NavBar title="首页" cb={ () => {
                    this.setState({
                        isShow: !this.state.isShow
                    })
                } }/>
                { this.state.isShow && <SideBar/> }
            </div>
        )
    }
}

interface IProps {
    title: string
    cb: () => void
}

class NavBar extends Component<IProps, any> {
    render() {
        return (
            <div>
                NavBar --- { this.props.title }
                <button onClick={ () => {
                    this.props.cb()
                } }>click</button>
            </div>
        )
    }
}

class SideBar extends Component {
    render() {
        return (
            <div>
                SideBar
            </div>
        )
    }
}