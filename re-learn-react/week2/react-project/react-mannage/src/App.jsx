import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Main from './layouts/main/Index'
import Login from './layouts/login/Login'
import { connect } from 'react-redux'

const mapState = (state) => {
    return {
        loginState: state.getIn(['user', 'loginState'])
    }
}

const App = ({ loginState }) => {
    return (
        <>
            <Router>
                <Switch>
                    {/* <Route path="/login" component={ Login } />
                    <Route path="/" component={ Main } ></Route> */}
                    {
                        String(loginState) === 'true' ? 
                        <Redirect path="/login" to="/" />
                        :
                        <Route path="/login" component={ Login } />
                    }

                    {
                        String(loginState) === 'true' ? 
                        <Route path="/" component={ Main } />
                        :
                        <Redirect to="/login"/>
                    }

                </Switch>
            </Router>
        </>
    );
}

export default connect(mapState)(App);
