import React, {useCallback, useState, memo} from 'react'

// class Com extends React.PureComponent {
//     render () {
//         console.log('0000')
//         return <div>com</div>
//     }
// }


//单独使用memo可以必须按重复渲染
const Com = memo(() => {
    console.log('com........')
    return (<div>com</div>)
})

const fontSize = { fontSize: 14 }


function UseCallback () {
   const [count, setCount] = useState(0)
    // const HandlerClick = () => {setCount(count+1)}
    const memoHandlerClick = useCallback(() => {
        setCount(count+1)
    }, [count])


    return (
        <>
        <button onClick = { memoHandlerClick}>{ count }</button>
            <Com />
        </>
    )
}

export default UseCallback