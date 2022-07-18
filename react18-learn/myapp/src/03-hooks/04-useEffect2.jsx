import React, { useEffect, useState } from 'react'

export default function App() {

    const [name, setName] = useState('test')

    // useEffect 第一次执行一次，之后依赖的值改变之后也会执行
    useEffect(() => {
        setName(name.substring(0,1).toLocaleUpperCase()+name.substring(1))
    }, [name])

    return (
        <div>
            app-{ name }
            <button onClick={ () => {
                setName('xiaoming')
            } }>click</button>
        </div>
    )
}
