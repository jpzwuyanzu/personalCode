import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function Detail() {
    const params = useParams();
    const navigate = useNavigate()
    return (
        <div>
            详情--{ params.myid }
            <button onClick={ () => { navigate('/detail/1000') } }>猜你喜欢</button>
        </div>
    )
}
