import React, { Component } from 'react';

class Form extends Component {
    state = {
        username:'',
        note:'',
        lesson:1
    }
    hendlerChange(e) {
        console.log(e.target.value)
        this.setState({ [e.target.name] : e.target.value })
    }
    render() {
        const {username, note, lesson} = this.state;
        return (
            <div>
                <input type="text" placeholder="用户名" value = { username } name="username" onChange={ this.hendlerChange.bind(this) }/><br/>
                <textarea placeholder="备注" value={ note } name="note" onChange={ this.hendlerChange.bind(this) }></textarea><br/>
                <select value = { lesson } name="lesson" onChange={ this.hendlerChange.bind(this) }>
                    <option value="阶段1">阶段1</option>
                    <option value="阶段2">阶段2</option>
                    <option value="阶段3">阶段3</option>
                </select>
            </div>
        );
    }
}

export default Form;
