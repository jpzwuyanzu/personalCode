import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import './../style/index.css'
import style from './Tabbar.module.css'
import { TabBar } from 'antd-mobile'
import {
    AppOutline,
    UnorderedListOutline,
    UserOutline,
  } from 'antd-mobile-icons'

export default function MyTabBar() {
    const navigate = useNavigate()
    const location = useLocation()
    const { pathname } = location

    const setRouteActive = (value) => {
        console.log(value)
        navigate(value)
    }

    const tabs = [
        {
        key: '/films',
        title: '电影',
        icon: <AppOutline />,
        },
        {
        key: '/cinemas',
        title: '影院',
        icon: <UnorderedListOutline />,
        },
        {
        key: '/center',
        title: '我的',
        icon: <UserOutline />,
        },
    ]
    return (
        <footer className={ style.tabbar }>
            {/* <ul>
                <li>
                   <NavLink className={({ isActive }) => isActive ? 'myActive' : ''} to="/films">电影</NavLink>
                </li>
                <li>
                    <NavLink className={({ isActive }) => isActive ? 'myActive' : ''} to="/cinemas">影院</NavLink>
                </li>
                <li>
                    <NavLink className={({ isActive }) => isActive ? 'myActive' : ''} to="/center">我的</NavLink>
                </li>
            </ul> */}
            <TabBar activeKey={pathname} onChange={value => setRouteActive(value)}>
                {tabs.map(item => (
                    <TabBar.Item key={item.key} icon={item.icon} title={item.title} />
                ))}
            </TabBar>
        </footer>
    )
}
