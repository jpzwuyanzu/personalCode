import React, { PureComponent } from 'react'

// 高阶组件是一个函数
const Fn = (Con) => {
    return class extends PureComponent {
        componentDidMount () {
            console.log('-=-=-=-=-=-=')
        }
        render () {
            return (
                <>
                <Con></Con>
                <footer>这里是测试高阶组件</footer> 
                </>
            )
        }
    }
}

@Fn
 class HocDecorator extends PureComponent {
    render() {
        return (
            <div>
                <h1>体验Hoc</h1>
               {/* <footer>这里是测试高阶组件</footer>  */}
            </div>
        )
    }
}

// Hoc= Fn(Hoc)


export default HocDecorator