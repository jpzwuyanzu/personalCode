import React from 'react';
// import { Route, Switch, NavLink } from 'react-router-dom'
import withWrapperfn from '../withWrapper'
// const User = ({routes}) => {
//     return (
//         <div>
//             <ul>
//                 {
//                     routes.map((route,index) => (
//                         <li key = { route.path }>
//                             <NavLink  to = { route.path }> { route.title }</NavLink>
//                         </li>
//                     ))
//                 }
//             </ul>
//             <Switch>
//                 {
//                     routes.map((route,index) => (
//                         <Route key = { route.path } path = { route.path } render = { () => (
//                             <route.component/>
//                         ) }  />
//                     ))
//                 }
//             </Switch>
//         </div>
//     );
// }

const User  = (props) => {
    return <div>{withWrapperfn(props.routes)}</div>
}

export default User;
