import React, { Component } from 'react'

//引用复制, 浅复制
var obj = {
    name: 'tets'
}
var obj2 = obj;
// console.log(obj, obj2)

// 如果对象是一层，可以深复制, 多曾对象就无法深复制了
var myobj = {
    name: 'test',
    arr: [1,2,3]
}
var obj3 = {
    ...myobj
}
obj3.name = 'ooooo'
obj3.arr.splice(0,1)
// console.log(myobj, obj3)

//json-parse json-stringfy
// 缺点是当属性中有undefined的值的时候，会自动删除该属性

//deepcopy： 性能不好，占用内存





export default class App extends Component {
    render() {
        return (
            <div>
                app
            </div>
        )
    }
}
