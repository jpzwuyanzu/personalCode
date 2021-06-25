import React, { PureComponent,createContext } from 'react';

//contex实现跨组件通信
const {Provider ,Consumer} =  createContext()

class Mya extends PureComponent {
    render(){
        return (
            <div>
                my-a
                <Myb/>
            </div>
        )
    }
}
class Myb extends PureComponent {
    render(){
        return (
            <div>
                my-b
                <Myc/>
            </div>
        )
    }
}
class Myc extends PureComponent {
    render(){
        return (
            <div>
                my-c
                <Consumer> 
                    {
                      (val) => {
                        return <span style={{ color : val }}> cdcdcd</span>
                       }
                    }
                </Consumer>
            </div>
        )
    }
}
//使用context实现顶级父组件向子孙组件传递参数
class Context extends PureComponent {
    state = {
        color:''
    }
    handlerChange(e){
        this.setState({
            color:e.target.value
        })
    }
    render() {
        return (
            <div>
                <input type="color" value={ this.state.color } onChange={ this.handlerChange.bind(this) }/>
                { this.state.color }
                <Provider value={ this.state.color }>
                 <Mya/>
                </Provider>
            </div>
        );
    }
}

export default Context;
