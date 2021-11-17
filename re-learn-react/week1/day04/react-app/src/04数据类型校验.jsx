
import React, { Component } from 'react'
import PropTypes from 'prop-types'


const Content = (props) => {
    console.log(props)
    return (
        <div>{ props.name } content { props.age }</div>
    )
}
Content.propTypes = { //当前组件的属性的类型
    name: PropTypes.string,
    age:  PropTypes.number.isRequired //isRequired用来指定必须数据
}

export default class App extends Component {
    render () {
        return (
            <>
                <Content name="ximeng" age={ 12 }></Content>
            </>
        )
    }
}
