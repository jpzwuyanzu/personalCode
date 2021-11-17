
import React, { Component } from 'react'
import axios from 'axios'


export default class App extends Component {

    //状态state的两种方式，一种是直接添加，一种是通过es6的继承机制添加state

    // state = {
    //     list: ['aaaa', 'bbbb']
    // }

    constructor (props) {  //es5和es6继承机制的区别
        super(props)
        this.state = {
            list: []
        }
    }
    componentDidMount () {
        // setState是异步的，
        axios.get('http://39.99.182.33/api/pro').then(res => {

            // console.log(res)
            // this.setState({
            //     list: res.data.data
            // }, () => {
            //     console.log(this.state.list)
            // })
            this.setState((prevState, props) => {
                console.log('prevState', prevState)
                console.log('props', props)
                return {
                    list: res.data.data
                }
            })
            console.log(this.state.list)
        })
    }
    render () {
        return (
            <>
                <div>9090</div>
            </>
        )
    }
}
