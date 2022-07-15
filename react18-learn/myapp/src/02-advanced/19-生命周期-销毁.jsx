import React, { Component } from 'react'

class Child extends Component {

    componentDidMount() {
        window.onresize = () => {
            console.log('resize')
        }
    }

    componentWillUnmount() {
        console.log('componentWillUnmount')
        // 在这里清除定时器，以及事件解绑
        window.onresize = null;
    }

    render() {
        return <div>child</div>
    }
}

export default class App extends Component {

    state = {
        isCreated: true
    }

    render() {
        return (
            <div>
                <button onClick={ () => {
                    this.setState({
                       isCreated: !this.state.isCreated 
                    })
                } }>button</button>
                {/* { this.state.isCreated ? <Child/> : '' } */}
                { this.state.isCreated && <Child/>}
            </div>
        )
    }
}
