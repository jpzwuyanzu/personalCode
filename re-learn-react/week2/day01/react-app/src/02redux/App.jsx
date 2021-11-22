import React, { Component } from 'react'
// import Child from './Child'
import store from './store'

export default class App extends Component {
    handlerDecrement = () => {
        store.dispatch({
            type: 'DECREMENT'
        })
    }

    handlerIncrement = () => {
        store.dispatch({
            type: 'INCRENMENT'
        })
    }
    render() {
        return (
            <div>
                <button onClick = { this.handlerDecrement }>-</button>
                <span id="count"></span> 
                <button onClick = { this.handlerIncrement }>+</button>
                {/* <Child></Child> */}
                { store.getState().count }
            </div>
        )
    }
    componentDidMount() {
        //组件加载完毕，初始化数据
        store.dispatch({type:''})
    }
}
