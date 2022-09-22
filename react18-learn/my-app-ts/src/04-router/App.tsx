import React, { Component } from 'react'
import { HashRouter } from 'react-router-dom'
import MRouter from '../04-router/router/index'

export default class App extends Component {
    render() {
        return (
            <div>
               <HashRouter>
                   <MRouter></MRouter>
               </HashRouter>
               <ul>
                   <li>电影</li>
                   <li>影院</li>
                   <li>我的</li>
               </ul>
            </div>
        )
    }
}
