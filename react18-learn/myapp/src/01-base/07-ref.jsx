import React, { Component } from 'react'

 class App extends Component {

    a = 100;
    myRef = React.createRef()
    render() {
        return (
            <div>
                {/* <input ref="myText"/>
                <button onClick={ () => { 
                    console.log('click1', this.refs.myText.value) 
                } }>add</button> */}
                 <input ref={ this.myRef }/>
                <button onClick={ () => { 
                    console.log('click1', this.myRef.current.value) 
                } }>add</button>
            </div>
        )
    }
}
/**
 * ref如果绑定在标签上可以拿到具体的dom节点 <input ref="myText"/>    this.refs.myText.value
 * 
 * 通过React.createRef()创建的引用可以通过 this.myRef.current.value 获取
 */

export default App;
