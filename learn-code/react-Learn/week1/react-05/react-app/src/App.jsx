import React, { Component } from 'react';
import ChangeUpCase from './components/changeUpCase'

class App extends Component {
    state = {
        list: ['aaa', 'bbb', 'cccc']
    }
    render() {
        return (
            <div>
                hello
                <ChangeUpCase list={ this.state.list } />
            </div>
        );
    }
}

export default App;
