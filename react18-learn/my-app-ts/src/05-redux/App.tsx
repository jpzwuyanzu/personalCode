import React, { Component } from 'react'
import { HashRouter } from 'react-router-dom'
import MRouter from '../04-router/router/index'
import store from './redux/store'

export default class App extends Component {
    state = {
        isShowTab: store.getState().isShow
    }
    componentDidMount() {
        store.subscribe(() => {
            console.log(store)
        })
        console.log(this.state.isShowTab)
    }
    render() {
        return (
            <div>
               <HashRouter>
                   <MRouter></MRouter>
               </HashRouter>
               {
                   this.state.isShowTab && <ul>
                   <li>电影</li>
                   <li>影院</li>
                   <li>我的</li>
               </ul>
               }
               
            </div>
        )
    }
}
