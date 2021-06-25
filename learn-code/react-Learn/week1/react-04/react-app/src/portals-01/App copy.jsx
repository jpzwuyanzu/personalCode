import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
class Model extends PureComponent{
    // render(){
    //     return (
    //         <> { this.props.children } </>
    //     )
    // }
    render(){
        return ReactDOM.createPortal(
            this.props.children,
            document.querySelector('body')
            )
    }
}


class App extends PureComponent {
    render() {
        return (
            <>
                hello
                <Model>
                    <div>
                        <header>model gandler</header>
                        <div>model content</div>
                        <footer>model footer</footer>
                    </div>    
                </Model>
            </>
        );
    }
}

export default App;
