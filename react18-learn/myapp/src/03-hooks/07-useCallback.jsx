import React, { useState } from 'react'

export default function App() {

    //useState 记忆函数，可以记住状态
    const [count, setCount] = useState(0)

    return (
        <div>
            <button onClick={ () => {
                setCount(count + 1)
            } }>click</button>
            { count }
        </div>
    )
}
