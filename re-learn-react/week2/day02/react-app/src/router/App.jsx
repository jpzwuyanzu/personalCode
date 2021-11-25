import React, { Component } from 'react'

import { Route, Link, useLocation } from 'react-router-dom'
import url from 'url'

const useQuery = () => {
    return url.parse(useLocation().search, true).query
}


const Box = (props) => {
    const { id } = useQuery()
    return(
        <div>box{ id }</div>
    )
}
export default class App extends Component {
    render() {
        return (
            <div>
                <ul>
                    <li><Link to="/detail?id=11">11</Link></li>
                    <li><Link  to="/detail?id=22">22</Link></li>
                    <li><Link  to="/detail?id=33">33</Link></li>
                </ul>
            <Route path='/detail' component={ Box }></Route>
            </div>
        )
    }
}
