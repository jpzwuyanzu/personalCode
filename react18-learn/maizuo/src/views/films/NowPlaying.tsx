import React, { Component } from 'react'
import BetterScroll from 'better-scroll'

class NowPlaying extends Component {

    state = {
        list: []
    }

    getData = () => {
        var list = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
        this.setState({
            list: list
        }, () => {
            new BetterScroll(".wrapper")
        })
    }

    render() {
        return (
            <div>
                <button onClick={ () => { this.getData() } }>click获取数据</button>
                <div className="wrapper" style={{ height: '200px', background: 'yellow', overflow: 'hidden' }}>
                    <ul className="content">
                        {
                            this.state.list.map((item, index) => <li key={ index }>{ item }</li>)
                        }
                    </ul>
                    {/* 这里可以放一些其它的 DOM，但不会影响滚动 */}
                </div>
            </div>
        )
    }
}


export default NowPlaying;