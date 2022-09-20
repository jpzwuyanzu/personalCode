import React, { Component } from 'react'

/**
 * 1， 下载immutable
 * 2, 导入map
 */
import { Map } from 'immutable'

// var obj = {
//     name: 'test',
//     age: 100
// }

// var oldImmuObj = Map(obj);
// var newImmuObj = oldImmuObj.set('name', 'xiaoming')
// console.log(oldImmuObj, newImmuObj)
//1, get获取immutanle的值
// console.log(oldImmuObj.get('name'), newImmuObj.get('name'))

//2,将immutanle对象转换为普通对象
// console.log(oldImmuObj.toJS(), newImmuObj.toJS())

export default class App extends Component {
    state = {
        info: Map({
            name: 'Test',
            age: '100'
        })
    }
    render() {
        return (
            <div>
                app---
                <button onClick={ () => {
                    this.setState({
                        info: this.state.info.set('name', 'xiaoming').set('age', 1000)
                    })
                } }>按钮</button>
                { this.state.info.get('name')} ---
                { this.state.info.get('age') }
            </div>
        )
    }
}
