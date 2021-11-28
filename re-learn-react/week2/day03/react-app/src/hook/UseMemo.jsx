import React, { useState, useMemo } from 'react';

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


    return (
        <div>
            <input type="text" value={ a } onChange={ (e) => setA(e.target.value) }/>
            <input type="text" value={ b } onChange={ (e) => setB(e.target.value) }/>
            <Parent a={ a } b={ b } />
        </div>
    );
}

export default UseMemo;
