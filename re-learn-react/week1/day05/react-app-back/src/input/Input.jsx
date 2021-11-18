import React, { Component } from 'react'
import VanInput from './VanInput'

export default class Input extends Component {
    state = {
        username: '',
        password: ''
    }
    reciveValueHandler(value, type) {
        this.setState({
            [type]: value
        })
    }
    submitForm() {
        console.log(this.state)
    }
    render() {
        return (
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
                <VanInput type="text" 
                placeholder="请输入手机号码" 
                name="username"
                reg="/^1[3456789]\d{9}$/" 
                errmsg="请输入正确手机号码" 
                reciveValue={this.reciveValueHandler.bind(this)}
                >
                </VanInput>
                <br/>
                <VanInput type="password" 
                placeholder="请输入密码" 
                name="password"
                reg="^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$" 
                errmsg="密码至少包含 数字和英文，长度6-20" 
                reciveValue={this.reciveValueHandler.bind(this)}
                >
                </VanInput>
                <br/>
                <button onClick={ this.submitForm.bind(this) }>注册</button>
            </div>
        )
    }
}
