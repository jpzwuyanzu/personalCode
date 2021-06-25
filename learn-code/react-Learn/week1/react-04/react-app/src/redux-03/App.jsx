import React, { Component } from 'react';
import store from './store';
import Child from './Child'

class App extends Component {
    render() {
        return (
            <div>
                <button onClick={ () => {
                    // 修改状态
                    store.dispatch({type:'DECREMENT'})
                }  }>-</button>
                { store.getState().count }
                <button onClick={ () => {
                    store.dispatch({type:'INCREMENT'})
                }  }>+</button>
                <hr/>
                <Child/>
            </div>
        );
    }
}

export default App;
