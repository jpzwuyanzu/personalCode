import React, { PureComponent } from 'react';
import Child from './Child'
import store from './store';

class App extends PureComponent {
    handlerDecrement =  () => {
        store.dispatch({type:'DECREMENT'})
    }
    handlerIecrement =  () => {
        store.dispatch({type:'INCRENMENT'})
    }
    render() {
        return (
            <div>
                <button onClick={ this.handlerDecrement }>-</button>
                <span id="count"></span>
                <button onClick={ this.handlerIecrement }>+</button>
                <hr/>
            </div>
        );
    }
    componentDidMount() {
        //组件加载完毕，初始化数据
        store.dispatch({type:''})
    }
}

export default App;
