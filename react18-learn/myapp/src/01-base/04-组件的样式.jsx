import React, { Component } from 'react'
import './css/01-index.css' //倒入css模块， webpack的支持
 class App  extends Component {
    render() {
        var myname = 'tony'
        var obj = {
            backgroundColor: 'red',
            fontSize: '30px'
        }
        return (
            <div>
                { 10+20 } - { myname }<br/>
                { 10 > 20 ? 'aaa' : 'bbb' }
                {/* 行内样式, react推荐的是行内样式写法 */}
                <div style={{ background: 'yellow' }}>111111</div>
                <div style={ obj }>44444</div>
                
                <div className="active">33333333333</div>

                <label htmlFor="username">用户名：</label>
                <input type="text" id="username"/>
            </div>
        )
    }
}

export default App;