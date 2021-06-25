import React from 'react'
import {BrowserRouter  as Router, Redirect, Route,Switch} from 'react-router-dom'
import { connect} from 'react-redux'
import Main from './layout/main/Index'
import Login from './layout/Login'

const App = ({loginState}) => {
  return (
   <Router>
     <Switch>
       {
         JSON.parse(loginState)  ?
         <Redirect path="/login" to="/" /> :
         <Route path="/login" component={Login}></Route>
       }
       {
        //  前端验证登录状态
         JSON.parse(loginState)  ?
         <Route path = "/" component = {Main} /> :
         <Redirect to="/login" />
       }

     </Switch>
   </Router>
  )
}

const mapState = (state) => {
  return {
    loginState: state.getIn(['user','loginState'])
  }
}

export default connect(mapState)(App)