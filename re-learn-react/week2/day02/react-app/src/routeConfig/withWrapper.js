import React  from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'



// eslint-disable-next-line import/no-anonymous-default-export
export default (routes) => {
    return (
        <div>
            <ul>
                {
                    routes.map((route, index) => (
                        <li key={ route.path }>
                            <NavLink to={ route.path }>{ route.title }</NavLink> 
                        </li>
                    ))
                }
            </ul>
            <Switch>
                {
                    routes.map((route, index) =>(
                        <Route key={ index }  path={ route.path } render = { () => (
                            <route.component routes={ route.children } />
                        )}/>
                    ))
                }
            </Switch>
        </div>
    )
}