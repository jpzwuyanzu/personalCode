import React, { Component } from 'react'
import store from './store'

export default class Child extends Component {
    render() {
        return (
            <div>
                <h1>子组件--- { store.getState().count }</h1>
            </div>
        )
    }
}
