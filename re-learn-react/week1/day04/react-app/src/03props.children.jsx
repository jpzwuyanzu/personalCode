
import React, { Component } from 'react'

// 类似插槽，内容分发, 自定义组件中，组件内的内容显示还是不显示，在哪里显示，就是由内容分发控制
const Content = (props) => {
    console.log(props)
    return (
        <div>{ props.children }content</div>
    )
}

export default class App extends Component {
    render () {
        return (
            <>
                <Content>你好，</Content>
            </>
        )
    }
}
