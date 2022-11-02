import React, { useEffect } from 'react'
import { useAppDispatch } from '../../hooks/redux-hook'
import { switchTabBar } from '../../store/tabbar.slice'

export default function Search() {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(switchTabBar({ status: false }))
        return () => {
          dispatch(switchTabBar({ status: true }))
        }
    }, [])
    return (
        <div>
            Search
        </div>
    )
}
