import React, { Component } from 'react'
import Child from './Child'
import store from './store'

export default class App extends Component {
    render() {
        return (
            <div>
               <button onClick = { () => {
                   store.dispatch({ type: 'DECREMENT' })
               } }>-</button>
               { store.getState().count }
               <button onClick = { () => {
                   store.dispatch({ type: 'INCREMENT' })
               } }>+</button>
               <Child></Child>
            </div>
            
        )
    }
}
