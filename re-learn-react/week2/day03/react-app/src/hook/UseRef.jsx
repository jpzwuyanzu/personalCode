
import React, { useState, useEffect, useRef } from 'react';

const UseRef = () => {
    // const [ count, setCount ] = useState(0) //三秒钟内点击了几次按钮，就会alert几次按钮的值
    const count = useRef(0) //三秒内点击了几次按钮，只会输出最新的值，就可以有效规避 React Hooks 中 Capture Value 特性。
    const pDiv = useRef()
    useEffect(() => {
        setTimeout(() => {
            alert(count.current) 
        },3000)
    }, [count])



    

    return (
        <div>
            {/* <p>coungt值：{ count }</p> */}
            <p ref={pDiv}>coungt值：{ count.current }</p>
            <p>
            <button onClick = { () => { 
                count.current += 1 
                pDiv.current.innerHTML = count.current } }>+1</button>
            <button onClick = { () => { 
                count.current -= 1
                pDiv.current.innerHTML = count.current
                 } }>-1</button>
            {/* <button onClick = { () => { setCount(count + 1) } }>+1</button>
            <button onClick = { () => { setCount(count - 1) } }>-1</button> */}
            </p>
        </div>
    );
}

export default UseRef;
