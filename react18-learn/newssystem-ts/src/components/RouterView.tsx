import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NotFind from '../views/404/NotFound'

const RouterView = () => {
    const [hasRights, setHasRights] = useState(false);
    const { pathname } = useLocation();
    const routeRights = JSON.parse((localStorage.getItem('rights') as any));
    useEffect(() => {
        routeRights.includes(pathname) ? setHasRights(true) : setHasRights(false)
    } ,[pathname, routeRights])
    return (
        <>
         { hasRights ?  <Outlet/> : <NotFind/>}
        </>
    )
}

export default RouterView
