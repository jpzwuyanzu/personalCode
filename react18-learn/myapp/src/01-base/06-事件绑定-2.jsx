import React, { Component } from 'react'

 class App extends Component {

    a = 100;

    handleClick2() {
        console.log('click2', this.a) 
    }
    handleClick3 = (evt) => {
        console.log('click3', this.a, evt.target)
    }
    handleClick4 = (params) => {
        console.log('click4', this.a, params)
    }
    /**
     * 
     * react中事件不会绑定在元素上，而是采用事件代理的模式，事件对象是react模拟的
     */
    render() {
        return (
            <div>
                <input type="text"/>
                <button onClick={ () => { console.log('click1,处理逻辑过多不推荐', this.a) } }>add</button>
                <button onClick={ this.handleClick2.bind(this) }>add2不推荐</button>
                <button onClick={ this.handleClick3 }>add3-推荐</button>
                {/* 比较推荐下边这种，可以做参数传递 */}
                <button onClick={ () => this.handleClick4('params') }>add4-比较推荐</button>
            </div>
        )
    }
}
/**
 * 改变this指向： 
 * call： 改变this指向，并且自动执行函数  // obj1.getname.call(obj2)
 * apply: 改变this指向，并且自动执行函数 obj1.getname.apply(obj2)
 * bind: 改变this指向，不会自动执行，需要手动执行 obj1.getname.bind(obj2)()
 */

// var obj1 = {
//     name: 'obj1',
//     getname () {
//         console.log(this.name)
//     }
// }
// var obj2 = {
//     name: 'obj2',
//     getname () {
//         console.log(this.name)
//     }
// }

// obj1.getname.call(obj2) 
// obj1.getname.apply(obj2) 
// obj1.getname.bind(obj2)()

export default App;
