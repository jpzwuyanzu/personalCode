import React, { Component } from 'react'
import BetterScroll from 'better-scroll'

export default class App extends Component {

    state = {
        list: ['111','222','333','444', '555','666','777','888','9999','1212','2323','24434','121332445','55657']
    }

    componentWillMount() {
        console.log(document.querySelectorAll('li'))
    }

    componentDidMount() {
        console.log(document.querySelectorAll('li'))
        // 在这里dom才会创建完成
        new BetterScroll('#wrapper')
    }
    render() {
        return (
            <div>
                <div id="wrapper" style={{height: '200px', overflow: 'hidden', background: 'yellow' } }>
                    <ul>
                        {
                            this.state.list.map((item) => <li key={ item }>{ item }</li>)
                        }
                    </ul>
                </div>
            </div>
        )
    }
}
