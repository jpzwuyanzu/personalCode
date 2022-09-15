import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
// import store from './../05-Redux/redux/store'
import store from './../06-Redux/redux/store'
// import { hide, show  } from './../05-Redux/redux/actionCreator/TabbarActionCreator'
import { hide, show  } from './../06-Redux/redux/actionCreator/tabbarActionCreator'

export default function Detail() {
    const params = useParams();
    const navigate = useNavigate()
    useEffect(() => {
        // store.dispatch 通知App
        store.dispatch(hide())
        return () => {
            console.log('destory')
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
