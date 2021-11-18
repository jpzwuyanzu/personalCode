import React, { Component } from 'react'
import { Fragment } from 'react/cjs/react.production.min';

export default class List extends Component {
    state = {
        list: ['tab1', 'tab2']
    }

    // react生命周期钩子函数
    UNSAFE_componentWillReceiveProps (props) {
        // console.log(props)
        this.setState({
            list: [...this.state.list, props.keyword] //深拷贝
        })
    }

    handlerClick(index) {
        this.state.list.splice(index, 1)
        this.setState({
            list: this.state.list
        })
    }

    render() {
        return (
           <ul>
               
               {
                   this.state.list.map((item, index) => {
                     return (
                        <Fragment key={ index }>
                            <li>{ item }</li>
                            <button onClick = { this.handlerClick.bind(this, index) }>删除</button>
                        </Fragment>
                     )
                   })
               }
           </ul>
        )
    }
}
