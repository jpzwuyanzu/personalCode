import React, { useState, useEffect } from 'react'
import { Swiper, Tabs } from 'antd-mobile'
import { Outlet } from 'react-router-dom'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Film() {
    const navigate = useNavigate();
    const location = useLocation()
    const [activeTabKey, setActiveTabKey] = useState('/films/NowPlaying')
    useEffect(() => {
        setActiveTabKey(location.pathname)
    })
    return (
        <div>
            <Swiper autoplay={ true } loop={ true }>
                <Swiper.Item>
                    <div className="swiper-content" style={{ background: '#ace0ff' }}>1111</div>
                </Swiper.Item>
                <Swiper.Item>
                    <div className="swiper-content" style={{ background: '#bcffbd' }}>2222</div>
                </Swiper.Item>
                <Swiper.Item>
                    <div className="swiper-content" style={{ background: '#e4fabd' }}>3333</div>
                </Swiper.Item>
            </Swiper>
            <div style={{ position: 'sticky', top: 0, background: 'white' }}>
                <Tabs onChange={ (key) => {
                    navigate(key)
                    setActiveTabKey(key)
                }} activeKey={ activeTabKey }>
                    <Tabs.Tab title='正在热映' key='/films/NowPlaying'></Tabs.Tab>
                    <Tabs.Tab title='即将上映' key='/films/ComingSoon'></Tabs.Tab>
                </Tabs>
            </div>
            {/* 路由容器 */}
            <Outlet/>
        </div>
    )
}
