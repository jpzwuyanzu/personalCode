import React, { Component } from 'react'

/**
 * 1， 下载immutable
 * 2, 导入map
 */
import { List, Map, fromJS } from 'immutable'

export default class App extends Component {
    state = {
        info: fromJS({
            name: 'test',
            location: {
                province: '广东',
                city: '东莞'
            },
            favor: ['读书', '看报', '写代码']
        })
    }

    componentDidMount() {
        console.log(this.state.info)
    }

    render() {
        return (
            <div>
                <h1>个人信息修改页面</h1>
                <button onClick={ () => {
                    this.setState({
                        info: this.state.info.set('name', 'tom').setIn(['location', 'city'], '深圳')
                    })
                } }>修改</button>
                <div>{ this.state.info.getIn(['name']) }</div>
                <div>{ 
                this.state.info.getIn(['location']).getIn(['province']) + '-' + this.state.info.getIn(['location']).getIn(['city']) }</div>
                <ul>
                {
                    this.state.info.getIn(['favor']).map((item, index) => <li key={ index }>{ item }<button onClick={ () => {
                        this.setState({
                            info: this.state.info.updateIn(['favor'], (list)=>list.splice(index, 1))
                        })
                    } }>删除</button></li>)
                }
                    
                </ul>
            </div>
        )
    }
}
