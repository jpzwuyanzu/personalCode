import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function Detail() {
    const obj = useParams()
    const navigate = useNavigate()
    console.log(obj.myid)
    return (
        <div>
            detail
            <button onClick={ () => { navigate('/detail/1000') } }>猜你喜欢</button>
        </div>
    )
}
