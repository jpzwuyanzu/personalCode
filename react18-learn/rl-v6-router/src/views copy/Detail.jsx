import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import store from './../05-Redux/redux/store'
import { hide, show  } from './../05-Redux/redux/actionCreator/TabbarActionCreator'

export default function Detail() {
    const params = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        console.log('create')
        // store.dispatch 通知App
        store.dispatch(hide())
        return () => {
            store.dispatch(show())
        }
    }, [])
    return (
        <div>
            详情--{ params.myid }
            <button onClick={ () => { navigate('/detail/1000') } }>猜你喜欢</button>
        </div>
    )
}
