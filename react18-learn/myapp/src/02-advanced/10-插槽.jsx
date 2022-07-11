import React, { Component } from 'react'

class Child extends Component {
    render() {
        return (
            <div>
                child
                {/* 插槽 vue slot, 具名插槽 */}
                {
                    this.props.children[0]
                }
                {
                    this.props.children[2]
                }
                {
                    this.props.children[1]
                }
            </div>
        )
    }
}

class Swiper extends Component {
    render() {
        return (
            <>{ this.props.children }</>
        )
    }
}

export default class App extends Component {
    render() {
        return (
            <div>
                <Swiper>
                <div>1111111</div><div>2222222</div><div>333333</div>
                </Swiper>
                <Swiper>
                <div>图片001</div><div>图片002</div><div>图片003</div>
                </Swiper>
                <Child>
                    <div>11111</div>
                    <div>22222</div>
                    <div>33333</div>
                </Child>
            </div>
        )
    }
}

// 1, 为了复用
// 2， 一定程度减少父子通信

