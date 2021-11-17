
import React, { useState } from 'react'

//体验react的hook， --------->让函数式组件拥有状态
const App = () => {
    const [count, setCount] = useState(10)
    const [list, setList] = useState(['1-', '-2'])

    const clickFn = () => {
        console.log('1111')
        setCount(count + 1)
    }
    return (
        <>
            <button onClick = { clickFn }>{ count }</button>
            <button data-id='1212' onClick = { (event) => {
                setList([ 'a', 'b' ])
                //可以通过event传值
                console.log(event.target.dataset.id)
                console.log(event.target.getAttribute('data-id'))
            } }>event传递参数</button>
        </>
    )
}

export default App