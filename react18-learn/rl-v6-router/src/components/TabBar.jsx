import React from 'react'
import { NavLink } from 'react-router-dom'
import './../style/index.css'
import style from './Tabbar.module.css'

export default function TabBar() {
    return (
        <footer className={ style.tabbar }>
            <ul>
                <li>
                   <NavLink className={({ isActive }) => isActive ? 'myActive' : ''} to="/films">电影</NavLink>
                </li>
                <li>
                    <NavLink className={({ isActive }) => isActive ? 'myActive' : ''} to="/cinemas">影院</NavLink>
                </li>
                <li>
                    <NavLink className={({ isActive }) => isActive ? 'myActive' : ''} to="/center">我的</NavLink>
                </li>
            </ul>
        </footer>
    )
}
