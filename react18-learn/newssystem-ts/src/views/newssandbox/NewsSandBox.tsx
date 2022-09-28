import React from 'react'
import { Outlet } from 'react-router-dom'
import SideMenu from '../../layout/SideMenu'
import TopHeader from '../../layout/TopHeader'

export default function NewsSandBox() {
    return (
        <div>
            <SideMenu></SideMenu>
            <TopHeader></TopHeader>
            <Outlet/>
        </div>
    )
}
