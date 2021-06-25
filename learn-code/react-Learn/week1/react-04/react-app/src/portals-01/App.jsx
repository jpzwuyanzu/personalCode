import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import './style.css'
const withPortal = (WrapperComponent) => {
    return class extends PureComponent{
        render(){
            return ReactDOM.createPortal(
                <WrapperComponent { ...this.props } />,
                document.querySelector('body')
            )
        }
    }
}
class Model extends PureComponent {
    render(){
        return (
            <div className="portal">
                <header>model header</header>
                <div>model content</div>
                <footer>
                    <button>按钮</button>
                </footer>
            </div>
        )
    }
}

// Model = withPortal(Model)

@withPortal
class App extends PureComponent {
    state = {
        count:100
    }
    handlerClick = () => {
        this.setState({
            count: this.state.count + 10
        })
    }
    render() {
        return (
            <div onClick = { this.handlerClick }>
                hello App-- { this.state.count }
                <Model></Model>
            </div>
        );
    }
}

export default App;
