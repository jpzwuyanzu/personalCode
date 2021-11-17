
import React from 'react'

const App = () => {
    const clickFn = () => {
        console.log('1111')
    }
    return (
        <>
            <button onClick = { clickFn }>事件处理</button>
            <button onClick = { () => {
                console.log('22222')
            } }>事件处理--函数体</button>
        </>
    )
}

export default App