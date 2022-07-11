import React, { Component } from 'react'

export default class App extends Component {
    render() {
        return (
            <div>
                app
            </div>
        )
    }
}


/**
 * 发布订阅模式
 */
//调度中心
var bus = {

    list: [],
    //订阅
    subscribe(callback) {
        this.list.push(callback)
    },
    //发布
    publish(text) {
        //将回调函数执行
        this.list.forEach((callback => {
            callback && callback(text)
        }))
    }
}

//订阅者
bus.subscribe((value) => {
    console.log('11111', value)
})

bus.subscribe((value) => {
    console.log('22222', value)
})

//发布者需要更晚的发布
setTimeout(() => {
    bus.publish('男人看了沉默')
},0)


setTimeout(() => {
    bus.publish('男人看了沉默')
},1000)

//Redux 基于订阅发布实现