import React, { useState } from 'react'

export default function App() {
    const [isShow, setIsShow] = useState<Boolean>(true)
    return (
        <div>
            App
            <NavBar cb={ () => {
                setIsShow(!isShow)
            } }/>
            {
                isShow && <SideBar/>
            }
        </div>
    )
}

interface IProps {
    title?: string
    cb:() => void
}

const NavBar = (props: IProps) => {
    return (
        <div>
            navbar
        <button onClick={ () => {
            props.cb()
        } }>click</button>
        </div>
    )
}

const SideBar = () => {
    return <div>sidebar</div>
}
