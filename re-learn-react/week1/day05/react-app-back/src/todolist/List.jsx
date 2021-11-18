import React, { Component } from 'react'
import { Fragment } from 'react/cjs/react.production.min';

export default class List extends Component {
    state = {
        list: ['test1', 'test2']
    }

    UNSAFE_componentWillReceiveProps (props) {
        this.setState({
            list: [...this.state.list, props.sendData]
        })
    }
    delItem (index) {
        console.log(index)
        this.state.list.splice(index, 1)
        this.setState({
            list: [...this.state.list]
        })
    }

    render() {
        return (
            <ul>
                {
                    this.state.list.map((item, index) => {
                        return (
                            <Fragment key = { index }>
                                <li>{ item } <button onClick = { this.delItem.bind(this, index) }>删除</button></li>
                            </Fragment>
                        )
                    })
                }
            </ul>
        )
    }
}
