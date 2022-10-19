import React from 'react'
import { Outlet } from 'react-router-dom'

export default function Film() {
    return (
        <div>
            <div className="myTitle">
              Film
            </div>
            <Outlet/>
        </div>
    )
}
