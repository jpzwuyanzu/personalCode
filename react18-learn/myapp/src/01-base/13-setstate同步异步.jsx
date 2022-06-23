import React, { Component } from 'react'

class App extends Component {

    state = {
        count: 1
    }

    render() {
        return (
            <div>
                { this.state.count }
                <button onClick={ this.handleAdd1 }>+</button>
                <button onClick={ this.handleAdd2 }>+</button>
            </div>
        )
    }

    handleAdd1 = () => {
        this.setState({
            count: this.state.count + 1
        }, () => {
            console.log(this.state.count)
        })
        this.setState({
            count: this.state.count + 1
        }, () => {
            console.log(this.state.count)
        })
        this.setState({
            count: this.state.count + 1
        }, () => {
            //状态和真实的Dom已经更新完了，
            console.log(this.state.count)
        })
    }

    handleAdd2 = () => {
        setTimeout(() => {
            this.setState({
                count: this.state.count + 1
            })
            this.setState({
                count: this.state.count + 1
            })
            this.setState({
                count: this.state.count + 1
            })
        },0)
    }
    /**
     * react 18之前
     * setState 如果在同步逻辑中 异步更新状态，异步更新DOM
     * 
     * setState 如果在异步逻辑中 同步更新状态
     * 
     * setState 接受两个参数，第二个参数回调函数，状态和DOM已经更新完成
     * 
     * 
     * 
     * react 18 两种结果一致
     */
}

export default App;
