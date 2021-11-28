import React, { useState, useMemo, useRef, useEffect } from 'react';

const Child1 = () => {
    console.log('child1111')
    return (
        <>
            child1....
        </>
    )
}
const Child2 = () => {
    console.log('child22222')
    return (
        <>
            child2....
        </>
    )
}

// const Parent =  ({ a, b }) => {
//     return (
//         <>
//         <Child1/>
//         <Child2/>
//         </>
//     )
// }

const Parent =  ({ a, b }) => {
    const child1 = useMemo(()  => <Child1 a={a}/>, [a])
    const child2 = useMemo(()  => <Child2 b={b} />, [b])
        return (
            <>
            { child1 }
            { child2 }
            </>
        )
    }

const UseMemo = () => {
    const [a, setA] = useState(1)
    const [b, setB] = useState(2)
    const aRef = useRef()
    const bRef = useRef()
    const testRef = useRef()
    useEffect(() => {
        console.log(testRef.current.innerHTML)
    },[])

    return (
        <div>
            <div ref = { testRef }>你好</div>
            <input type="text"  ref= { aRef } onChange={ (e) => setA(aRef.current.value) }/>
            <input type="text" ref= { bRef }  onChange={ (e) => setB(bRef.current.value) }/>
            <Parent a={ a } b={ b } />
        </div>
    );
}

export default UseMemo;
