import React, { Component } from 'react'

/**
 * 1， 下载immutable
 * 2, 导入map
 */
import { Map } from 'immutable'

export default class App extends Component {
    state = {
        info: Map({
            name: 'test',
            select: "aa",
            filter: Map({
                text: "",
                up: true,
                down: false
            })
        })
    }

    componentDidMount() {
        console.log(this.state.info)
    }

    render() {
        return (
            <div>
                app
            </div>
        )
    }
}
