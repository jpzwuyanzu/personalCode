import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom'

export default  (routes) => {
    return (
        <div>
            <ul>
                {
                    routes.map((route) => (
                        <li key = { route.path }>
                            <NavLink  to = { route.path }> { route.title }</NavLink>
                        </li>
                    ))
                }
            </ul>
            <Switch>
                {
                    routes.map((route) => (
                        <Route key = { route.path } path = { route.path } render = { () => (
                            <route.component routes = {route.children} />
                        ) }  />
                    ))
                }
            </Switch>
        </div>
    )
}
