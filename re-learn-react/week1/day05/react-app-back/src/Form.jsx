import React, { Component } from 'react'

export default class Form extends Component {

    // 当组件的值受控于状态，就属于受控组件，需要通过change事件来获取值
    state = {
        username: '',
        password: ''
    }
    handlerChange (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    submitForm (e) {
        console.log(this.state)
    }
    render() {
        const { username, password } = this.state
        return (
            <>
                <div style={{ textAlign: 'center', marginTop: '30px' }}>
                    <input type="text" placeholder="请输入用户名" name='username' value = { username } onChange = { this.handlerChange.bind(this) } />
                    <br/>
                    <br/>
                    <input type="password" placeholder="请输入密码" name='password' value = { password } onChange = { this.handlerChange.bind(this) } />
                </div>
                <div style={{ textAlign: 'center' }}>
                <br/>
                    <button onClick = { this.submitForm.bind(this) }>提交</button>
                </div>
            </>
        )
    }
}
