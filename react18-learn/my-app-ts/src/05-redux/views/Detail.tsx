import React, { useEffect } from 'react'
import store from '../redux/store'

export default function Detail() {
    useEffect(() => {
        store.dispatch({
            type: 'hide'
        })
        console.log('详情页面')
        console.log(store.getState().isShow)
    }, [])
    return (
        <div>
           Detail 
        </div>
    )
}
