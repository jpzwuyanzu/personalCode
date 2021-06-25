import React , { useState } from 'react';

//  class UseState extends React.Component {
//      state = {
//          count : 0
//      }
//      render() {
//         return (
//          <>
//             <button onClick = { () => {this.setState({count: this.state.count +1})} }>+</button>
//             { this.state.count } 
//             <button onClick = {() => {this.setState({count: this.state.count  -1})} }>-</button>
//          </>
//         )
//      }
//  }



// useState的修改函数， 需要存入的是计算之后的结果
// 修改函数依据初始化变量命名
const UseState = () => {
    const [count, setCount] = useState(0)
    const [age,setAge] = useState(10)
    const [obj, setObj] = useState({username:'', password:''});

    function handlerChange(e) {
        // setObj({...obj,  [e.target.name] :  e.target.value})
        setObj(() => {
            return {...obj,  [e.target.name] :  e.target.value}
        })
    }


    return (
        <div>
            <button onClick = { () => setCount(count + 1) }>+</button>
            {count}
            <button onClick = { () => setCount(count - 1) }>-</button>
            <button onClick = { () => setAge(20) }>修改{ age }</button>
            <input type="text" value = {obj.username} onChange = { handlerChange } name = "username" />
            <input type="text" value = {obj.password} onChange = { handlerChange } name = "password"/>
            { obj.username } { obj.password }
        </div>
    );
}

export default UseState;
