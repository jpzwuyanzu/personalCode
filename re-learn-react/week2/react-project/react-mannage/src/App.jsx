import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Main from './layouts/main/Index'
import Login from './layouts/login/Login'

const App = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/login" component={ Login } />
                    <Route path="/" component={ Main } ></Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
