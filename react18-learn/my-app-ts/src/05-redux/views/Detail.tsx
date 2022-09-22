import React, { useEffect } from 'react'
import store from '../redux/store'

export default function Detail() {
    useEffect(() => {
        store.dispatch({
            type: 'hide'
        })
        return () => {
            store.dispatch({
                type: 'show'
            })
        }
    }, [])
    return (
        <div>
           Detail 
        </div>
    )
}
