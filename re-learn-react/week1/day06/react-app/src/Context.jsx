import React, { PureComponent, createContext } from 'react'
const MyContext = createContext()
const { Provider, Consumer } =  MyContext
// const { Provider, Consumer: MyConsumer } = createContext() //可以使用别名



// class Myc extends PureComponent {
//     render() {
//         return(
//             <div>
//                 <Consumer>
//                     {
//                         (val) => {
//                             return (
//                                 <span style={{ color: val }}>{ val }</span>
//                             )
//                         }
//                     }
//                 </Consumer>
//             my-c
//         </div> 
//         )
//     }
// }


class Myc extends PureComponent {
    //挂载在 class 上的 contextType 属性可以赋值为由 React.createContext() 
    //创建的 Context 对象。此属性可以让你使用 this.context 来获取最近 Context 上的值。
    //你可以在任何生命周期中访问到它，包括 render 函数中。
    static contextType = MyContext
    render() {
        return(
            <div>
                <span style={{ color: this.context }}>{ this.context }</span>
            my-c
        </div> 
        )
    }
}

class Myb extends PureComponent {
    render() {
        return(
            <div>
            my-b

            <Myc></Myc>
        </div> 
        )
    }
}


class Mya extends PureComponent {
    render() {
        return (
            <div>
            my-a
            <Myb></Myb>
        </div>
        )
    }
}


export default class Context extends PureComponent {
    state = {
        color: ''
    }
    changeHandler(e) {
        this.setState({
            color: e.target.value
        })
    }
    render() {
        return (
            <div>
                context传值
                <input type="color" value={ this.state.color } onChange={ this.changeHandler.bind(this) } / >{ this.state.color }
                <Provider value={ this.state.color }>
                  <Mya></Mya>
                </Provider>
            </div>
        )
    }
}
