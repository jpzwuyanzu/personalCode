import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Film() {
    return (
        <div>
            <div style={{ height: '200px', background: 'yellow' }}>大轮播</div>
            {/* 路由容器 */}
            <Outlet/>
        </div>
    )
}
