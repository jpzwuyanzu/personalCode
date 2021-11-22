import React, { PureComponent } from 'react'
import ReactDOM from 'react-dom'

class Model extends PureComponent {
    // render () {
    //     return (
    //         <>
    //         { this.props.children }
    //         </>
    //     )
    // }

    render () {
        return ReactDOM.createPortal(
            this.props.children, 
            document.querySelector('body')
            )
    }
}

export default class App extends PureComponent {
    render() {
        return (
            <div>
                <Model>
                    <div>
                    <h1>model handler</h1>
                    <div>model content</div>
                    <footer>model footer</footer>
                    </div>
                </Model>
                portals
            </div>
        )
    }
}
