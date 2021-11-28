import React, { useState, useEffect, useRef } from 'react';

function useUpdate (fn) { // 自定义hook
    const mounting = useRef(true)
    useEffect (() => {
        if(mounting.current) {
            mounting.current = false
        } else {
            fn()
        }
    })
}



const UseEffect = () => {
    const [ count, setCount ] = useState(0)
    useEffect (() => { // componnetDidMount
        console.log('count发生改变'+ count)
    }, [])
    useUpdate(() => { //componentDidUpdate 
        console.log('count1111')
    })
    return (
        <div>
            <button onClick = { () => { setCount(count + 1) } }>{ count }</button>
        </div>
    );
}

export default UseEffect;
