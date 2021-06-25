import React from 'react';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import ScrollToTop from './components/ScorllToTop'
import { connect } from 'react-redux'
import Main from './layout/main/Index'
import Login from './layout/Login'
import NoAuthorized from './views/others/403/403_page'

const App = ({loginState}) => {
    return (
     <Router>
       <ScrollToTop>
       <Switch>
       {/* 这里判断权限 */}
       <Route path="/403" component={NoAuthorized} />
         {
           //  前端验证登录状态
           JSON.parse(loginState)   ?
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
       </ScrollToTop>
     </Router>
    )
  }
  
  const mapState = (state) => {
    return {
      loginState: state.getIn(['user','loginState'])
    }
  }
  
  export default connect(mapState)(App)
