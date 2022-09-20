import React, { Component } from 'react'

/**
 * 1， 下载immutable
 * 2, 导入map
 */
import { List, Map } from 'immutable'

export default class App extends Component {
    state = {
        info: Map({
            name: 'test',
            location: Map({
                province: '广东',
                city: '东莞'
            }),
            favor: List(['读书', '看报', '写代码'])
        })
    }

    componentDidMount() {
    }

    render() {
        return (
            <div>
                <h1>个人信息修改页面</h1>
                <button onClick={ () => {
                    this.setState({
                        info: this.state.info.set('name', 'tom')
                    })
                } }>修改</button>
                <div>{ this.state.info.get('name') }</div>
                <div>{ 
                this.state.info.get('location').get('province') + '-' + this.state.info.get('location').get('city') }</div>
                <ul>
                {
                    this.state.info.get('favor').map((item, index) => <li key={ index }>{ item }<button>删除</button></li>)
                }
                    
                </ul>
            </div>
        )
    }
}
