import React, { Component } from 'react'
// import { Route, Switch, NavLink } from 'react-router-dom'
import routes from '../routeConfig/routes'
import withWrapperFn from '../routeConfig/withWrapper'

export default class App extends Component {
    render() {
        return (
            <div>
                {/* <nav>
                    <ul>
                       {
                           routes.map((route, index) => (
                               <li key={ route.path }>
                                   <NavLink  to={ route.path }>{ route.title }</NavLink>
                               </li>
                           ))
                       } 
                    </ul>
                </nav>
                {
                    routes.map((route, index) => {
                      return(
                          <Switch key = { index }>
                             <Route path={ route.path } render = {
                                  () => {
                                      return <route.component routes={ route.children } />
                                  }
                             }></Route>
                        </Switch>
                      )  
                    })
                } */}

                {
                    withWrapperFn(routes)
                }
            </div>
        )
    }
}
