import React from 'react';
// import { Switch, Route, NavLink } from 'react-router-dom'
import withWrapperFn from './../withWrapper'



// const User = ({ routes }) => {
//     return (
//         <div>
//             <ul>
//                 {
//                     routes.map((route, index) => (
//                         <li key={ route.path }>
//                             <NavLink to={ route.path }>{ route.title }</NavLink> 
//                         </li>
//                     ))
//                 }
//             </ul>
//             <Switch>
//                 {
//                     routes.map((route, index) =>(
//                         <Route key={ index }  path={ route.path } render = { () => (
//                             <route.component/>
//                         )}/>
//                     ))
//                 }
//             </Switch>
//         </div>
//     );
// }

const User = (props) => {
    return (
        <div>
            {
                withWrapperFn(props.routes)
            }
        </div>
    )
}

export default User;
