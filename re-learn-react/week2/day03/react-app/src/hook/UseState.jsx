import React, { useState } from 'react';

// class UseState extends React.Component {
//     state = { count: 0 }
//     render () {
//         return (
//             <>
//                 <button onClick={ () => { this.setState({ count: this.state.count + 1 }) } }>+</button>
//                 { this.state.count }
//                 <button onClick={ () => { this.setState({ count: this.state.count - 1 }) } }>-</button>
//             </>
//         )
//     }
// }



// useState的修改函数需要存入的是计算之后的结果
// 修改函数名称依据初始化变量而命名
const UseState = () => {
    const [count, setCount] = useState(0)
    const [age, setAge] = useState(18)
    const [obj, setobj] = useState({ username: '', password: '' })
    

    function handlerChange(e) {
        console.log(e.target.value)
        // setobj({ ...obj, [e.target.name]: e.target.value })
        setobj(() => {
            return { ...obj, [e.target.name]: e.target.value }
        })
    }

    return (
        <div>
            <button onClick={ () => setCount(count + 1) }>+</button>
            { count }
            <button onClick={ () => setCount(count - 1) }>-</button>
            <br/>
            <br/>
            { age }
            <button onClick = { () => setAge(15) }>修改为15</button>
            <br/><br/>
            <input type="text" value={ obj.username } onChange = { handlerChange } name="username" />
            <br/><br/>
            <input type="password" value={ obj.password } onChange = { handlerChange } name="password"/>
            <br/><br/>
            { obj.username } - { obj.password }

        </div>
    );
}

export default UseState;
