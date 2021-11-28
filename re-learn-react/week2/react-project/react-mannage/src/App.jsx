import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Main from './layouts/main/Index'

const App = () => {
    return (
        <>
            <Router>
                <Switch>
                    <Route path="/" component={ Main } ></Route>
                </Switch>
            </Router>
        </>
    );
}

export default App;
