# v6路由

### 1 App.js
```js
import React from 'react'
import { HashRouter, Routes,  Route } from 'react-router-dom'
import Film from './views/Film'
import Cinema from './views/Cinema'
import Center from './views/Center'

const App = () =>  {
  return (
    <HashRouter>
      <Routes>
      <Route path="/film" element={ <Film/> } />
      <Route path="/cinema" element={ <Cinema/> } />
      <Route path="/center" element={ <Center/> } />
      </Routes>
    </HashRouter>
  )
}


export default App;
```

### 2,以及路由与多级路由
src/router/index.js
```js
import React from 'react'
import { Routes,  Route } from 'react-router-dom'
import Film from './../views/Film'
import Cinema from './../views/Cinema'
import Center from './../views/Center'

const MRouter = () =>  {
    return (
        <Routes>
            {/* 这里可以添加/路由 */}
            {/* <Route path="/" element={ <Film/> } /> */}
            {/* 也可以设置index来指定/渲染的组件 */}
            {/* <Route index element={ <Film/> } /> */}

            <Route path="/film" element={ <Film/> } />
            <Route path="/cinema" element={ <Cinema/> } />
            <Route path="/center" element={ <Center/> } />


        </Routes>
    )
}

export default MRouter;
```
#### 2.1 index
 index用于嵌套路由，仅匹配父路径时，设置渲染的组件，设置如果有多个自路由，指定默认渲染哪个子路由
```js
 {/* <Route index element={ <Film/> } /> */}
```

### 3， 路由重定向

 1.可以用用Navigate组件替代
 ```js
 {/* 重定向方式1，使用Navigate组件 */}
 <Route path="*" element={ <Navigate to="/films"/> } />
 ```

 2，可以使用自定义Redirect组件

 ```js
 {/* 重定向方式2，自定义一个Redirect组件 */}
<Route path="*" element={ <Redirect to="/films"/> } />
 ```

 ### 4，嵌套路由
 ```js
{/* 嵌套路由 */}
<Route path="/films" element={ <Film/> }>
    <Route path="nowPlaying" element={ <NowPlaying/> } />
    <Route path="comingSoon" element={ <ComingSoon/> } />
</Route>
 ```

 ### 5，申明式导航和编程式导航

 申明式导航
src/components/TabBar.jsx
```jsx
import React from 'react'
import { NavLink } from 'react-router-dom'
import './../style/index.css'

export default function TabBar() {
    return (
        <footer>
            <ul>
                <li>
                   <NavLink className={({ isActive }) => isActive ? 'myActive' : ''} to="/films">电影</NavLink>
                </li>
                <li>
                    <NavLink className={({ isActive }) => isActive ? 'myActive' : ''} to="/cinemas">影院</NavLink>
                </li>
                <li>
                    <NavLink className={({ isActive }) => isActive ? 'myActive' : ''} to="/center">我的</NavLink>
                </li>
            </ul>
        </footer>
    )
}
```

编程式导航--urlquery参数
```jsx
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function NowPlaying() {
    
    const [list, setList] = useState([])

    useEffect(() => {
        axios({
            url: 'https://m.maizuo.com/gateway?cityId=110100&pageNum=1&pageSize=10&type=1&k=5199589',
            headers: {
                'X-Client-Info': '{"a":"3000","ch":"1002","v":"5.2.0","e":"16558863921792667809742849","bc":"110100"}',
                'X-Host': 'mall.film-ticket.film.list'
            }
        }).then(res => {
            console.log(res)
            setList(res.data.data.films)
        })
    },[])
    const navigate = useNavigate()
    const handleChangePage = (id) => {
        //跳转页面
        //navigate
        // 利用url 传递参数 /detail?id=1000
        navigate(`/detail?id=${id}`)

        
        //路由传递参数 /detail/1000
    }

    return (
        <div>
            <ul>
                {
                    list.map((item) => {
                       return <li key={ item.filmId } onClick={ () => handleChangePage(item.filmId) }>{ item.name }</li>
                    })
                }
            </ul>
        </div>
    )
}

```
### 6, 路由拦截(登录状态拦截)
```jsx
import React from 'react'
import { Routes,  Route } from 'react-router-dom'
import Redirect from '../components/Redirect'
import Film from './../views/Film'
import Cinema from './../views/Cinema'
import Center from './../views/Center'
import NotFound from './../views/NotFound'
import Search from './../views/Search'
import NowPlaying from './../views/films/NowPlaying'
import ComingSoon from './../views/films/ComingSoon'
import Detail from './../views/Detail'
import Login from './../views/Login'

const MRouter = () =>  {
    return (
        <Routes>
            {/* 这里可以添加/路由 */}
            {/* <Route path="/" element={ <Film/> } /> */}
            {/* 也可以设置index来指定/渲染的组件 */}
            {/* <Route index element={ <Film/> } /> */}

            {/* 嵌套路由 */}
            <Route path="/films" element={ <Film/> }>
                <Route index element={ <NowPlaying/> } />
                <Route path="nowPlaying" element={ <NowPlaying/> } />
                <Route path="comingSoon" element={ <ComingSoon/> } />
            </Route>
            <Route path="/cinemas" element={ <Cinema/> } />
            <Route path="/center" element={<AuthComponent>
                <Center></Center>
            </AuthComponent>} />
            <Route path="/login" element={ <Login/> } />
            {/* 动态路由 /detal/:id */}
            <Route path="/detail/:myid" element={ <Detail/> } />
            <Route path="/cinemas/search" element={ <Search/> } />

            {/* 重定向方式1，使用Navigate组件 */}
            {/* <Route path="*" element={ <Navigate to="/films"/> } /> */}

            {/* 重定向方式2，自定义一个Redirect组件 */}
            <Route path="/" element={ <Redirect to="/films"/> } />

            {/* 404 */}
            <Route path="*" element={ <NotFound/> } />
        </Routes>
    )
}


export default MRouter;

//路由鉴权，判断是否登录
function AuthComponent({ children }) {
    const isLogin = localStorage.getItem("token")
    return isLogin ?  children : <Redirect to="/login" />
}
```

### 7, 路由模式

HashRouter 带# 不需要后端配置
BrowserRouter 不带# 后端需要配置对应的路由，如果没有刷新会找不到页面， 后端需要指定到index.html就可以  

### 8，withRouter的使用
withRouter()高阶组件主要使用在类组件中
自定义封装withRouter
```jsx
import React from 'react'
import { useNavigate, useParams, useLocation } from 'react-router-dom'

export default function withRouter(Component) {
    return function (props) {
        const push = useNavigate()
        const match = useParams()
        const location = useLocation()
        return <Component { ...props } history={{ push, match, location }} />
    }
}
```
### 9，路由懒加载
router/index.js
```js
import React from 'react'
import { Routes,  Route } from 'react-router-dom'
import Redirect from '../components/Redirect'
// import Film from './../views/Film'
// import Cinema from './../views/Cinema'
// import Center from './../views/Center'
// import NotFound from './../views/NotFound'
// import Search from './../views/Search'
// import NowPlaying from './../views/films/NowPlaying'
// import ComingSoon from './../views/films/ComingSoon'
// import Detail from './../views/Detail'
// import Login from './../views/Login'

const MRouter = () =>  {
    return (
        <Routes>
            {/* 这里可以添加/路由 */}
            {/* <Route path="/" element={ <Film/> } /> */}
            {/* 也可以设置index来指定/渲染的组件 */}
            {/* <Route index element={ <Film/> } /> */}

            {/* 嵌套路由 */}
            <Route path="/films" element={ LazyLoad('Film') }>
                <Route index element={ LazyLoad('films/NowPlaying') } />
                <Route path="nowPlaying" element={ LazyLoad('films/NowPlaying') } />
                <Route path="comingSoon" element={ LazyLoad('films/ComingSoon') } />
            </Route>
            <Route path="/cinemas" element={ LazyLoad('Cinema') } />
            <Route path="/center" element={<AuthComponent>
                { LazyLoad('Center') }
            </AuthComponent>} />
            <Route path="/login" element={ LazyLoad('Login') } />
            {/* 动态路由 /detal/:id */}
            <Route path="/detail/:myid" element={ LazyLoad('Detail') } />
            <Route path="/cinemas/search" element={ LazyLoad('Search') } />

            {/* 重定向方式1，使用Navigate组件 */}
            {/* <Route path="*" element={ <Navigate to="/films"/> } /> */}

            {/* 重定向方式2，自定义一个Redirect组件 */}
            <Route path="/" element={ <Redirect to="/films"/> } />

            {/* 404 */}
            <Route path="*" element={ LazyLoad('NotFound') } />
        </Routes>
    )
}


export default MRouter;

//路由鉴权，判断是否登录
function AuthComponent({ children }) {
    const isLogin = localStorage.getItem("token")
    return isLogin ?  children : <Redirect to="/login" />
}


//路由懒加载封装
const LazyLoad = (path) => {
    const Com = React.lazy(() => import(`../views/${path}`))
    return (
        <React.Suspense fallback={ <>加载中...</> }>
            <Com/>
        </React.Suspense>
    )
}
```


### 10，useRoutes钩子配置路由
router/index.js
```js
import React from 'react'
import { useRoutes } from 'react-router-dom'
import Redirect from '../components/Redirect'

const MRouter = () =>  {
    const element = useRoutes([
        {
            path: '/films',
            element: LazyLoad('Film'),
            children: [
                {
                    path: "",
                    element: <Redirect to="/films/NowPlaying"/>
                },
                {
                    path: "nowPlaying",
                    element: LazyLoad('films/NowPlaying')
                },
                {
                    path: "comingSoon",
                    element: LazyLoad('films/ComingSoon')
                }
            ]
        },
        {
            path: '/cinemas',
            element: LazyLoad('Cinema')
        },
        {
            path: '/cinemas/search',
            element: LazyLoad('Search')
        },
        {
            path: '/login',
            element: LazyLoad('Login')
        },
        {
            path: '/center',
            element: <AuthComponent>{ LazyLoad('Center') }</AuthComponent>
        },
        {
            path: '/detail/:myid',
            element: LazyLoad('Detail')
        },
        {
            path: '/',
            element: <Redirect to="/films"/>
        },
        {
            path: '*',
            element: LazyLoad('NotFound')
        }

    ])
    return (
        element
    )
}


export default MRouter;

//路由鉴权，判断是否登录
function AuthComponent({ children }) {
    const isLogin = localStorage.getItem("token")
    return isLogin ?  children : <Redirect to="/login" />
}


//路由懒加载封装
const LazyLoad = (path) => {
    const Com = React.lazy(() => import(`../views/${path}`))
    return (
        <React.Suspense fallback={ <>加载中...</> }>
            <Com/>
        </React.Suspense>
    )
}
```

