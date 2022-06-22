import React, { Component } from 'react'

 class App extends Component {
    handleClick2() {
        console.log('click2')
    }
    handleClick3 = () => {
        console.log('click3')
    }
    handleClick4 = () => {
        console.log('click4')
    }
    render() {
        return (
            <div>
                <input type="text"/>
                <button onClick={ () => { console.log('click1,处理逻辑过多不推荐') } }>add</button>
                <button onClick={ this.handleClick2 }>add2</button>
                <button onClick={ this.handleClick3 }>add3</button>
                {/* 比较推荐下边这种，可以做参数传递 */}
                <button onClick={ () => { this.handleClick4() } }>add4</button>
            </div>
        )
    }
}

export default App;
