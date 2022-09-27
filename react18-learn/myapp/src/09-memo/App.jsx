import React, { memo, useState } from 'react'

export default function App() {

    const [name, setName] = useState('test');
    const [title, setTitle] = useState('1111')

    return (
        <div>
            <p>{ name }</p>
            <button onClick={ () => {
                setName('tony')
            } }>click11</button>
            <button onClick={ () => {
                setTitle('测试memo')
            } }>click22</button>
            <Child { ...title } />
        </div>
    )
}

const Child = memo(({ title }) => {
    console.log('child-1111')
    return (
        <div>child---{ title }</div>
    )
})