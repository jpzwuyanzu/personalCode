import React, { PureComponent } from 'react';

// 类似vue的混入mixins
// 高阶组件是一个函数，接收一个组件
const Fn = (Con) => {
    return class extends PureComponent {
        componentDidMount(){
            console.log('jkjkjk')
        }
        render () {
            return(
                <>
                <Con/>
                <footer>这里是清风</footer>
                </>
            )
        }
    }
}

// 高阶组件
class Hoc extends PureComponent {
    render() {
        return (
            <div>
                <h1>体验Hoc</h1>
            </div>
        );
    }
}

Hoc = Fn(Hoc)

export default Hoc;
