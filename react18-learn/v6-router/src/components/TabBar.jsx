import React from 'react'
import { NavLink } from 'react-router-dom'
import './TabBar.css'

export default function TabBar() {
    return (
        <footer>
            <ul>
                <li>
                    <NavLink to="/films" className={ ({ isActive }) =>  isActive ? 'linkActive' : ''}>电影</NavLink>
                </li>
                <li>
                    <NavLink to="/cinemas" className={ ({ isActive }) =>  isActive ? 'linkActive' : ''}>影院</NavLink>
                </li>
                <li>
                    <NavLink to="/center" className={ ({ isActive }) =>  isActive ? 'linkActive' : ''}>我的</NavLink>
                </li>
            </ul>
        </footer>
    )
}
