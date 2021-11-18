import React, { Component } from 'react'

export default class Form extends Component {
    state = {
        username: '',
        usernameTip: '',
        clear: false,
        note: '',
        lesson: 1,
    }
    handlerChange (e) {
        this.setState({ [e.target.name]: e.target.value })
        switch (e.target.name) {
            case 'username':
               var flag = e.target.value.length > 0
               var str =  e.target.value.length > 5 ? 'ok' : '请输入合法的用户名'
               this.setState({
                   usernameTip: str,
                   clear: flag
               })
                break;
            default:
                break;
        }
    }
    render() {
        const {username, note ,lesson, usernameTip, clear} = this.state
        return (
            <div>
                <input type="text" placeholder="用户名" name="username" value={ username } onChange= { this.handlerChange.bind(this) }/>{ clear ? <span>X</span> : null }{ usernameTip }
                <br/>
                <br/>
                <textarea placeholder="备注" name="note" value={ note } onChange= { this.handlerChange.bind(this) }></textarea>
                <br/>
                <select value={ lesson } name="lesson" onChange= { this.handlerChange.bind(this) }>
                    <option value="1">1tab</option>
                    <option value="2">2tab</option>
                    <option value="3">3tab</option>
                </select>
                <button onClick={ () => {
                    console.log({username, note, lesson })
                } }>提交</button>
            </div>
        )
    }
}
