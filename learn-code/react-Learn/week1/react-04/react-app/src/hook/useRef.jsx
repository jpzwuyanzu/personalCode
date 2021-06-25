import React, {useRef, useEffect} from 'react';

function UseRef () {
    // const [count,setcount] = useState(0)
    const count = useRef(0) //使用useRef规避capture value
    const pdiv = useRef()

    useEffect(() => {
        setTimeout(() => {
            alert(count.current) //3s钟之内点击几次按钮就会弹出几次按钮的值
        },3000)
    }, [count]);

    return (
        <>
        <p>count值为<span ref = {pdiv}></span></p>
        <button onClick = { () => { 
            count.current += 1
            pdiv.current.innerHTML = count.current
        } }>+</button>
        <button onClick = { () => { 
            count.current -= 1
            pdiv.current.innerHTML = count.current
             } }>-</button>
        </>
    )
}
export default UseRef;
