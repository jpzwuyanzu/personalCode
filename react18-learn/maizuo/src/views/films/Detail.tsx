import React, { useEffect } from 'react'
import { useAppDispatch } from '../../hooks/redux-hook'
import { switchTabBar } from '../../store/tabbar.slice'
import { useParams } from 'react-router-dom'

export default function Detail() {
    const dispatch = useAppDispatch();
    const params = useParams();
    console.log(params)

    useEffect(() => {
        dispatch(switchTabBar({ status: false }))
        return () => {
          dispatch(switchTabBar({ status: true }))
        }
    }, [])

    return (
        <div>
            Detail--- { params.filmId }
        </div>
    )
}
