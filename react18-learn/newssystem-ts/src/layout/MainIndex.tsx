import React from 'react'
import { Outlet } from 'react-router-dom'
import SideMenu from './SideMenu'
import TopHeader from './TopHeader'

export default function MainIndex() {
    return (
        <div>
            <SideMenu></SideMenu>
            <TopHeader></TopHeader>
            {/* <Outlet/> */}
        </div>
    )
}
