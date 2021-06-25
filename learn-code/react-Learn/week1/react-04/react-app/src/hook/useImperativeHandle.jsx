import React, { useImperativeHandle, useRef , useEffect} from 'react';


//////////////////////
const MyInput = (props,ref) => {
    const inpurRef = useRef()
    useImperativeHandle(ref, () => inpurRef.current) //将子组件的ref透传给父组件
    return (
        <input ref = {inpurRef} onChange = { () => {props.onChange()} } type="text"/>
    )
}
//React.forwardRef(MyInput)会创造出一个React组件
// 使用该方法可以将该组件所接受的ref属性转发到其组件树下的另一个组件中
const MyInputBox = React.forwardRef(MyInput) //使用useImperativeHandle+ React.forwardRef(myinput)实现透传
////////////////////////



//给自定义组件添加ref是不被允许，需要使用React.forwardRef
const UseImperativeHandle = () => {
    const pref = useRef()
    useEffect(() => {
       pref.current.focus()
    }, []);
    return (
        <div>
            <MyInputBox ref={pref} onChange = {() => {
                console.log(pref.current.value)
            }} />
        </div>
    );
}

export default UseImperativeHandle;
