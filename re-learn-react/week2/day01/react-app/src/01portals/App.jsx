import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'
import './style.css'

const withPortal = (WrapperComponent) => {
    return class extends PureComponent {
        render () {
            return ReactDOM.createPortal(
                <WrapperComponent { ...this.props }></WrapperComponent>,
                document.querySelector('body')
            )
        }
    }
}

// 可以使用装饰器语法
@withPortal
class Model extends PureComponent {
    render () {
        return (
            <div className="portal">
                <header>model header</header>
                <div>model content</div>
                <footer>
                    <button onClick={ () => {console.log('protal自定义事件')} }>按钮</button>
                </footer>
            </div>
        )
    }
}

// Model = withPortal(Model)

export default class App extends PureComponent {
    state = {
        count: 100
    }
    handlerClick = () => {
       this.setState({
           count: this.state.count + 10
       }) 
    }
    render() {
        return (
            <div onClick={ this.handlerClick }>
                portals -- { this.state.count }
                <button>打开模态框</button>
                <Model></Model>
            </div>
        )
    }
}
