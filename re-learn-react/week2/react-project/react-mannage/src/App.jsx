import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import ScrollTotop from './components/ScrollToTop'
import Main from './layouts/main/Index'
import Login from './layouts/login/Login'
import NotFound from './views/result/NotFound'
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
                <ScrollTotop>
                <Switch>
                    {/* <Route path="/login" component={ Login } />
                    <Route path="/" component={ Main } ></Route> */}
                    <Route path="/403" component={ NotFound } />
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
                </ScrollTotop>
            </Router>
        </>
    );
}

export default connect(mapState)(App);
