import React, { Component } from 'react';
// import { Route, Switch, NavLink } from 'react-router-dom'
import routes from './routes'
import withWapperFn from './withWrapper'
class App extends Component {
    // 路由配置  Route.config
    render() {
        return (
            <div>
                {/* <nav>
                    <ul>
                        {
                        routes.map((route,index) => (
                            <li key = { route.path }>
                             <NavLink   to = { route.path }> { route.title } </NavLink>
                            </li>
                        ))
                    }
                    </ul>
                </nav>
                <Switch>
                    {
                        routes.map((route,index) => (
                            <Route key = { route.path } path = { route.path  } render = { () => {
                                return <route.component routes = {route.children} />
                            } } />
                        ))
                    }
                </Switch> */}
                {
                    withWapperFn(routes)
                }
            </div>
        );
    }
}

export default App;
