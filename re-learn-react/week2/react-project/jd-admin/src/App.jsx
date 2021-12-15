import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Main from './layout/main/Index'
import Login from './layout/Login'
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
                    {
                        loginState ? 
                        <Redirect path="/login" to="/" />
                        :
                        <Route path="/login" component={ Login } />
                    }
                    {/* <Route path="/login" component={ Login } /> */}
                    {   // 前端验证登录状态
                        loginState ? 
                        <Route path="/" component={ Main }></Route> 
                        : 
                        <Redirect exact to="/login" />
                    }
                    
                </Switch>
            </Router>
        </>
    );
}

export default connect(mapState)(App);
