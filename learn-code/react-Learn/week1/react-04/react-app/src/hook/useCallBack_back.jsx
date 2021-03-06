import React, {useState} from 'react'

//
const Com = () => {
    console.log('com')
    return (
        <div>com</div>
    )
}

const fontSize = { fontSize: 14 }


// class UseCallback extends React.Component {
//     state = {count : 0}
//     doSomething = () => {console.log('do someThing')}
//     render() {
//         return (
//            <>
//            <button onClick = { () => { this.setState({count : this.state.count + 1})}}>{ this.state.count }</button>
//              <Com 
//             style = {{ fontSize }}
//             doSomething = {this.doSomething}
//              />
//            </>
//         )
//     }
// }


function UseCallback () {
    const [count, setCount] = useState(0)
   const  doSomething = () => {
        console.log('do somethins')
    }
    return (
        <>
        <button onClick = { () => {setCount(count+1)}}>{ count }</button>
            <Com 
        style = {{ fontSize }}
        doSomething = {doSomething}
            />
        </>
    )
}

export default UseCallback