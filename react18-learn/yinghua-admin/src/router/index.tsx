import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'

const Login: any = React.lazy(() => import('../views/login/Login'));
const PageSandBox = React.lazy(() => import('../layout/page-sand-box/PageSandBox'));
const AdList = React.lazy(() => import('../views/ad-mannage/AdList'));
const Home = React.lazy(() => import('../views/home-mannage/Home'));
const RoleList = React.lazy(() => import('../views/role-mannage/RoleList'));
const UserList = React.lazy(() => import('../views/user-mannage/UserList'));

const MRouter = () => {
    const element = useRoutes([
        {
            path: '/login',
            element: <Suspense><Login/></Suspense>
        },
        {
            path: '/',
            element: <Suspense><PageSandBox/></Suspense>,
            children: [
                {
                    path: '',
                    element: <Home/>
                },
                {
                    path: 'home',
                    element: <Suspense><Home/></Suspense>
                },
                {
                    
                }
            ]
        }
    ])
}