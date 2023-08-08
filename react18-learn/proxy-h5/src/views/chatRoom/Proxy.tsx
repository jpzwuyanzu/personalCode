import React from 'react'
import { Outlet } from 'react-router-dom'

export default function proxy() {
    
  return (
    <div>
        <div>代理会话</div>
        <div>订单详情</div>
    <Outlet/>
    </div>
  )
}
