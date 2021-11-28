import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';

const MyInput = (props, ref) => {
    const inputRef = useRef()
    useImperativeHandle(ref, () => inputRef.current)
    return (
        <input ref= {inputRef} type="text"/>
    )
}

const MyInputBox = forwardRef(MyInput)


// 给自定义组件添加ref默认是不被允许的
const UseImperativeHandle = () => {
    const pref = useRef()
    useEffect(() => {
        console.log(pref)
        pref.current.focus()
    },[])

    return (
        <div>
            <MyInputBox ref={pref}></MyInputBox>
        </div>
    );
}

export default UseImperativeHandle;
