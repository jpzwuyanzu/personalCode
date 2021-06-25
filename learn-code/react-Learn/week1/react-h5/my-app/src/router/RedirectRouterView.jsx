import React from 'react'
import { Switch, Redirect  } from 'react-router-dom'
import menus from './router'

const RedirectRouterView = () => {
    console.log('909090')

    return (
        <Switch>
            {
                menus.map((item) => {
                    const Item =  <Redirect key={item.path} path={item.path} exact to={item.redirect} />
                    console.log(Item)
                    return Item
                })
            }
        </Switch>
    )
}

export default RedirectRouterView
