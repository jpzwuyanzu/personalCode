import React from 'react'
import { Outlet, NavLink } from 'react-router-dom'
// name.module.css  css模块化
import style from  './css/film.module.css'

export default function Film() {
    return (
        <div>
            <div style={{ height: '200px', background: 'yellow' }}>大轮播</div>
            <ul>
                <li><NavLink className={({ isActive }) => isActive ? style.activeTab : ''}  to="/films/NowPlaying">正在热映</NavLink></li>
                <li><NavLink className={({ isActive }) => isActive ? style.activeTab : ''} to="/films/ComingSoon">即将上映</NavLink></li>
            </ul>
            {/* 路由容器 */}
            <Outlet/>
        </div>
    )
}
