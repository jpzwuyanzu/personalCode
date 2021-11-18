import React, { Component } from 'react'
import VanInput from './VanInput'

export default class Input extends Component {
    state = {
        username: '',
        
    }
    render() {
        return (
            <div>
                <VanInput type="text"></VanInput>
                <VanInput type="password"></VanInput>
            </div>
        )
    }
}
