import React, { Component } from 'react'

class App extends Component {

    state={
        list: [
            {
                text: '11111',
                id: 1
            },
            {
                text: '22222',
                id: 2
            },
            {
                text: '33333',
                id: 3
            }
        ]
    }

    render() {
        return (
            <div>
                <ul>
                    { this.state.list.map(item => <li key={ item.id }>{ item.text }</li>) }
                </ul>
            </div>
        )
    }
}

/**
 * 原生JS的map()  方法
 * 设置key值，为了列表的复用和重排，最好是item.id, 如果不涉及列表的增加，删除，设置为index也没有问题
 */

export default App;