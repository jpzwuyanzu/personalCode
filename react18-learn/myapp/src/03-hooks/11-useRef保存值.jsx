import React, { useState, useRef } from 'react'

export default function App() {

    // react中的ref两个作用，
    // 第一可以用来保存dom的引用
    // 第二可以用来保存变量引用

    const [count, setCount] = useState(0)
    let tempCount = useRef(0)


    return (
        <div>
            <button onClick={ () => {
                setCount(count+1)
                tempCount.current++
            } }>add</button>
            count: { count }
            tempCount: { tempCount.current }
        </div>
    )
}
