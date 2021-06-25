import React, {useState, useEffect, useRef} from 'react';

function  useUpdate(fn) { //自定义Hook
    const mounting = useRef(true)
    if(mounting.current) {
        mounting.current = false
    } else {
        fn()
    }
}



const UseEffect = () => {
const [count, setCount] = useState(0)
    useEffect(() => { //componentDidMount
       console.log('count的值发生改变' + count)
    },[]);
    useUpdate(() => { //相当于自定义一个钩子函数，代替了componentDidUpdate钩子
        console.log('count11111')
    })
    return (
        <div>
           <button onClick = {() => {setCount(count + 1)}}>{count}</button>
        </div>
    );
}

export default UseEffect;
