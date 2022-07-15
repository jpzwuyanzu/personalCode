import React, { Component } from 'react'
import axios from 'axios'
import BetterScroll from 'better-scroll'

export default class App extends Component {
    state = {
        myName: 'test',
        list: []
    }
    componentDidMount() {
        axios.get('/test.json').then(res => {
            this.setState({
                list: res.data.data.films
            })
        })
    }
    render() {
        console.log('render')
        return (
            <div>
                <button onClick={ () => { this.setState({ myName: 'friends' }) } }>修改</button>
                { this.state.myName }
                <div id='wrapper' style={{ height: '100px',overflow: 'hidden', background: 'yellow' }}>
                    <ul>
                        {
                            this.state.list.map((item) => <li key={ item.filmId }>{ item.name }</li>)
                        }
                    </ul>
                </div>
            </div>
        )
    }
    UNSAFE_componentWillUpdate() {
        console.log('UNSAFE_componentWillUpdate')
    }
    componentDidUpdate(prevProps, prepState) {
        console.log('componentDidUpdate')
        console.log(prepState.list)
        // 更新后想要获取dom节点，这里可以获取到
        new BetterScroll('#wrapper')
    }
}
