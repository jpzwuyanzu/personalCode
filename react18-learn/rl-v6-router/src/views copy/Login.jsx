import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const navigate = useNavigate()

    return (
        <div>
            <input type="text"/>
            <button onClick={ () => {
                localStorage.setItem('token', "1212")
                navigate('/center')
            } }>登录</button>
        </div>
    )
}
