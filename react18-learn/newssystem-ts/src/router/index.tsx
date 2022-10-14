import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import Redirect from '../components/Redirect'
import Loading from '../components/Loding'
const Login = React.lazy(() => import('../views/login/Login'))
const NewsSandBox = React.lazy(() => import('../views/newssandbox/NewsSandBox'))
const Home = React.lazy(() => import('../views/home/Home'))
const UserList = React.lazy(() => import('../views/user-mannage/UserList'))
const RightList = React.lazy(() => import('../views/right-mannage/RightList'))
const RoleList = React.lazy(() => import('../views/right-mannage/RoleList'))
const AddNews = React.lazy(() => import('../views/news-manage/Add'))
const DraftNews = React.lazy(() => import('../views/news-manage/Draft'))
const CategoryNews = React.lazy(() => import('../views/news-manage/Category'))
const NewsPreview = React.lazy(() => import('../views/news-manage/NewsPreview'))
const NewsUpdate = React.lazy(() => import('../views/news-manage/NewsUpdate'))
const AuditNews = React.lazy(() => import('../views/audit-manage/Audit'))
const NewsList = React.lazy(() => import('../views/audit-manage/List'))
const UnpublishedNews = React.lazy(() => import('../views/publish-manage/Unpublished'))
const PublishedNews = React.lazy(() => import('../views/publish-manage/Published'))
const SunsetNews = React.lazy(() => import('../views/publish-manage/Sunset'))
const NotFound = React.lazy(() => import('../views/404/NotFound'))
const MRouter = () => {
    const element = useRoutes([
        {
            path: '/login',
            element: <Suspense fallback={ <Loading/> }><Login/></Suspense>
        },
        {
            path: '/',
            element: <Suspense fallback={ <Loading/>}><AuthComponent><NewsSandBox/></AuthComponent></Suspense>,
            children: [
                {
                    path: '',
                    element: <Redirect to="/home"/>
                },
                {
                    path: 'home',
                    element: <Suspense fallback={ <Loading/>}><AuthComponent><Home/></AuthComponent></Suspense>
                },
                {
                    path: 'user-manage/list',
                    element: <Suspense fallback={ <Loading/>}><AuthComponent><UserList/></AuthComponent></Suspense>
                },
                {
                    path: 'right-manage/right/list',
                    element: <Suspense fallback={ <Loading/>}><AuthComponent><RightList/></AuthComponent></Suspense>
                },
                {
                    path: 'right-manage/role/list',
                    element: <Suspense fallback={ <Loading/>}><AuthComponent><RoleList/></AuthComponent></Suspense>
                },
                {
                    path: 'news-manage/add',
                    element: <Suspense fallback={ <Loading/>}><AuthComponent><AddNews/></AuthComponent></Suspense>
                },
                {
                    path: 'news-manage/draft',
                    element: <Suspense fallback={ <Loading/>}><AuthComponent><DraftNews/></AuthComponent></Suspense>
                },
                {
                    path: 'news-manage/category',
                    element: <Suspense fallback={ <Loading/>}><AuthComponent><CategoryNews/></AuthComponent></Suspense>
                },
                {
                    path: 'news-manage/preview/:id',
                    element: <Suspense fallback={ <Loading/>}><AuthComponent><NewsPreview/></AuthComponent></Suspense>
                },
                {
                    path: 'news-manage/update/:id',
                    element: <Suspense fallback={ <Loading/>}><AuthComponent><NewsUpdate/></AuthComponent></Suspense>
                },
                {
                    path: 'audit-manage/audit',
                    element: <Suspense fallback={ <Loading/>}><AuthComponent><AuditNews/></AuthComponent></Suspense>
                },
                {
                    path: 'audit-manage/list',
                    element: <Suspense fallback={ <Loading/>}><AuthComponent><NewsList/></AuthComponent></Suspense>
                },
                {
                    path: 'publish-manage/unpublished',
                    element: <Suspense fallback={ <Loading/>}><AuthComponent><UnpublishedNews/></AuthComponent></Suspense>
                },
                {
                    path: 'publish-manage/published',
                    element: <Suspense fallback={ <Loading/>}><AuthComponent><PublishedNews/></AuthComponent></Suspense>
                },
                {
                    path: 'publish-manage/sunset',
                    element: <Suspense fallback={ <Loading/>}><AuthComponent><SunsetNews/></AuthComponent></Suspense>
                }
            ]
        },
        {
            path: '/',
            element: <Redirect to="/"/>
        },
        {
            path: '*',
            element: <Suspense fallback={ <Loading/>}><NotFound/></Suspense>
        }
    ])
    return (element)
}

export default MRouter

//路由鉴权，判断是否登录，如果未登录重定向到登录页面
const AuthComponent = ({ children }: any) => {
    const isLogin = localStorage.getItem('token');
    return isLogin ? children : <Redirect to="/login" />
}
//路由懒加载
// const LazyLoad = (path: string) => {
//     const Com = React.lazy(() => import(`../views/${path}`));
//     return (
//         <Suspense fallback={ <>加载中...</> }>
//             <Com/>
//         </Suspense>
//     )
// }