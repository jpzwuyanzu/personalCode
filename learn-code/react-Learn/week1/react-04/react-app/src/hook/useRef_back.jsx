import React, {useMemo, useRef, useState,useEffect} from 'react';

const Child1 = () => {
    console.log('child1111.....')
    return(
        <>
        child1.....
        </>
    )
}

const Child2 = () => {
    console.log('child2222.....')
    return(
        <>
        child2.....
        </>
    )
}

// const Parent =  ({a,b}) => {
//     return (
//         <>
//         <Child1/>
//         <Child2/>
//         </>
//     )
// }

//使用useMemo可以避免不必要被渲染的元素不会渲染，
//组件的依赖项不改变就不会渲染
//useMemo（参数一代表需要执行的业务逻辑，参数二代表的是依赖项）

const Parent =  ({a,b}) => {
    const child1 = useMemo(() => <Child1 a = {a} />, [a])
    const child2 = useMemo(() => <Child2 b = {b} />, [b])
    return (
        <>
        {child1} {child2}
        </>
    )
}



const UseMemo = () => {
    const [a, SetA] = useState(1)
    const [b, SetB] = useState(1)
    const aRef = useRef()
    const bRef = useRef()
    const testRef = useRef()
    useEffect(() => {
        console.log(testRef.current.innerHTML)
    });
    return (
        <div>
            <div ref={testRef}>测试ref</div>
            <input type="text" ref = { aRef }  onChange = { () => {SetA(aRef.current.value)} } />
            <input type="text" ref = { bRef }  onChange = { () => {SetB(bRef.current.value)} } />
           <Parent a={a} b={b} /> 
        </div>
    );
}

export default UseMemo;
