import React from 'react'

export default function App() {
    return (
        <div>
            app
            <Child name="aaa" />
        </div>
    )
}

 interface IProps {
     name: string
 }

const Child = (props:IProps) => {
    return <div>Child--{props.name}</div>
}

// const Child:React.FC<IProps> = (props) => {
//     return <div>Child--{props.name}</div>
// }
