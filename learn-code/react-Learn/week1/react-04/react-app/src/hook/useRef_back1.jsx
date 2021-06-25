import React, {useMemo, useRef, useState,useEffect} from 'react';

function UseRef () {
    const [count,setcount] = useState(0)

    useEffect(() => {
        setTimeout(() => {
            alert(count) //3s钟之内点击几次按钮就会弹出几次按钮的值
        },3000)
    }, [count]);

    return (
        <>
        <p>count值为{count}</p>
        <button onClick = { () => { setcount(count+1) } }>+</button>
        <button onClick = { () => { setcount(count-1) } }>-</button>
        </>
    )
}
export default UseRef;
