import React, { Component } from 'react'

export default class App extends Component {
    state = {
        list: []
    }

    componentDidMount() {
        // fetch -》 数据请求--无需安装
        // 返回的值为promise对象，需要转换为json对象
        fetch('/pro.json').then(res => res.json()).then(result => {
            // console.log(result)
            this.setState({
                list: result
            })
        })
    }

    render() {
        return (
            <div>
                <ul>
                    {
                        this.state.list.map((item, index) => {
                            return (
                                <li key = { item.positionId }> { item.positionName }</li>
                            )
                        })
                    }
                   
                </ul>
            </div>
        )
    }
}
