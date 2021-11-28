import React, { useState, useCallback, memo } from 'react';

// class Com extends React.PureComponent {
//     // shouldComponentUpdate () {
//     //     return false
//     // }
//     render () {
//         console.log('Com')
//         return (
//             <div>Com</div>
//         )
//     }
// }


const Com = memo(() => {
    console.log('Com....')
    return (
        <div>Com</div>
    )
})

const fontSize = { fontSize: 14 }
const UseCallback = () => {
    const [ count, setCount] = useState(0)
    // const doSomething = () => { console.log('do something'); }
    const handlerClick = () => { setCount(count + 1)}
    // const memoHandlerClick = useCallback(() => {
    //     setCount(count + 1)
    // }, [count])
    return (
        <>
        <button onClick = { handlerClick }>
            { count }
        </button>
        <Com/> 
    </>
    )
}


export default UseCallback;
