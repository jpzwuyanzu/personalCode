import React from 'react';
import { Switch, Redirect } from 'react-router-dom'
import menus from './menu'

const redirectMenus = menus.filter(item => item.redirect)

const RedirectRouterView = () => {
    return (
        <Switch>
            {
                redirectMenus.map(item => <Redirect key={ item.path } path={ item.path } exact to={ item.redirect } />)
            }
        </Switch>
    );
}

export default RedirectRouterView;
