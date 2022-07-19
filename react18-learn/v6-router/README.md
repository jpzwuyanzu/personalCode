# 1.一级路由与多级路由

```jsx
<Route path="/cinemas" element={ <Cinema/> } />
<Route path="/cinemas/search" element={ <Search/> } />
<Route path="/center" element={ <Center/> } />
```

# 2.路由重定向

自定义 Redirect 组件

```jsx
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Redirect({ to }) {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(to, { replace: true });
  });
  return null;
}
```

```jsx
{
  /* 路由重定向的两个方案 */
}
{
  /* 方案1: 使用Navigate组件实现重定向功能 */
}
{
  /* <Route path="*" element={ <Navigate to="films" /> }/> */
}
{
  /* 方案2: 自定义一个重定向组件 */
}
<Route path="/" element={<Redirect to="films" />} />;
{
  /* 处理404页面 */
}
<Route path="*" element={<NotFound />} />;
```

# 3.嵌套路由

```jsx
<Route path="/films" element={<Film />}>
  {/* 指定默认子组件 */}
  <Route index element={<NowPlaying />} />
  <Route path="nowplaying" element={<NowPlaying />} />
  <Route path="comingsoon" element={<ComingSoon />} />
</Route>
```

# 4.声明式导航与编程式导航

## 4.1.声明式导航

```jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "./TabBar.css";

export default function TabBar() {
  return (
    <footer>
      <ul>
        <li>
          <NavLink
            to="/films"
            className={({ isActive }) => (isActive ? "linkActive" : "")}
          >
            电影
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/cinemas"
            className={({ isActive }) => (isActive ? "linkActive" : "")}
          >
            影院
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/center"
            className={({ isActive }) => (isActive ? "linkActive" : "")}
          >
            我的
          </NavLink>
        </li>
      </ul>
    </footer>
  );
}
```
## 4.2.编程式导航

通过useNavigate()钩子获取
```jsx
import { useNavigate } from 'react-router-dom'
const handleChangePage = (id) => {
        //跳转页面
        //query传递参数/detail?id=100
        navigate(`/detail?id=${id}`)
    }
```

获取url后边的query参数 使用useSearchParams()钩子
```jsx
import React from 'react'
import { useSearchParams } from 'react-router-dom'

export default function Detail() {

    const [searchParams, setSearchParams] = useSearchParams()
    //获取参数 searchParams.get('id')
    // 判断参数是否存在 searchParams.has('id')
    // 同时页面内也可以调用set方法修改路由 setSearchParams({ id: 4 })
    console.log(searchParams.get('id'))

    return (
        <div>
            Detail
            <button onClick={ () => { setSearchParams({ id: 1000 }) } }>猜你喜欢</button>
        </div>
    )
}

```

# 5.动态路由

```jsx
const handleChangePage = (id) => {
        //2.路由传递参数 /detail/1000
        navigate(`/detail/${id}`)
    }
```

```jsx
{/* 动态路由 */}
<Route path="/detail/:myid" element={ <Detail/> } />
```

获取动态路由的参数
```jsx
import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function Detail() {
    const obj = useParams()
    const navigate = useNavigate()
    return (
        <div>
            detail
            <button onClick={ () => { navigate('/detail/1000') } }>猜你喜欢</button>
        </div>
    )
}
```

# 6.路由拦截
 登录路由拦截

 ```jsx
 <Route path="/login" element={ <Login/> } />
 <Route path="/center" element={ <AuthComponent>
    <Center></Center>
    </AuthComponent> } />

//路由拦截组件的封装
const AuthComponent = ({ children }) => {
    const isLogin = localStorage.getItem('token')
    return isLogin ?  children : <Redirect to="/login"/>
}
 ```

# 7.路由模式
 <!-- HashRouter : 带有#的路由地址 #/home -->
 <!-- BrowserRouter : 普通路由地址 /home -->
 <!-- 使用了BrowserRouter 方式，后端无法处理需要配置指向index.html -->

```jsx
import { HashRouter } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
```

# 8.withRouter/类组件跳转方法
<!-- v6之前的版本需要使用withRouter包裹组件V6不需要了 -->
下边是自定义withRouter高阶组件
```js
import React from 'react'
import { useNavigate, useLocation, useParams } from 'react-router-dom'

export default function withRouter(Component) {
    return function(props) {
        const push = useNavigate()
        const location = useLocation()
        const match = useParams()

        return <Component a="1" { ...props } history={{ push, location, match }} />
    }
}

```
```jsx
import React, { Component } from 'react'
import withRouter from '../../components/withRouter'

 class FilmItem extends Component {

    handleClick = (id) => {
        console.log(id)
        //this.props.history.push  跳转页面
        //this.props.history.match  获取参数
        //this.props.history.location  获取路径
        this.props.history.push(`/detail/${id}`)
    }

    render() {
        console.log(this.props.history)
        return (
            <li onClick={ () => this.handleClick(this.props.filmId) }>{ this.props.name }</li>
        )
    }
}

export default withRouter(FilmItem)

//  在路由v6中没有withRouter， 需要使用class组件的时候自己定一个
```

# 9.路由懒加载
可以优化首屏加载慢
```jsx
import React from 'react'
// import { Routes, Route, Navigate } from 'react-router-dom'
import { Routes, Route } from 'react-router-dom'
import Redirect from '../components/Redirect'
// import Film from '../views/Film'
// import Cinema from '../views/Cinema'
// import Search from '../views/Search'
// import Center from '../views/Center'
// import Detail from '../views/Detail'
// import Login from '../views/login'
// import NowPlaying from '../views/films/NowPlaying'
// import ComingSoon from '../views/films/ComingSoon'
// import NotFound from '../views/NotFound'

export default function MRouter() {
    return (
        <Routes>
            {/* <Route path="/" element={ <Film/> } /> */}
            {/* <Route index element={ <Film/> } /> */}
            {/* 这里是嵌套路由 */}
            <Route path="/films" element={ lazyLoad('Film') }>
                {/* 指定默认子组件 */}
                <Route index element={ lazyLoad('films/NowPlaying') } />
                <Route path="nowplaying" element={ lazyLoad('films/NowPlaying') } />
                <Route path="comingsoon" element={ lazyLoad('films/ComingSoon') } />
            </Route>
            <Route path="/cinemas" element={ lazyLoad('Cinema') } />
            <Route path="/cinemas/search" element={ lazyLoad('Search') } />
            <Route path="/login" element={ lazyLoad('login')} />
            <Route path="/center" element={ <AuthComponent>
                {lazyLoad('Center')}
            </AuthComponent> } />

            {/* 动态路由与普通路由 */}
            {/* <Route path="/detail" element={ <Detail/> } /> */}
            <Route path="/detail/:myid" element={ lazyLoad('Detail') } />


            {/* 路由重定向的两个方案 */}
            {/* 方案1: 使用Navigate组件实现重定向功能 */}
            {/* <Route path="*" element={ <Navigate to="films" /> }/> */}
            {/* 方案2: 自定义一个重定向组件 */}
            <Route path="/" element={ <Redirect to="films" /> }/>
            {/* 处理404页面 */}
            <Route path="*" element={ lazyLoad('NotFound') }/>
        </Routes>
    )
}

//路由拦截组件的封装
const AuthComponent = ({ children }) => {

    const isLogin = localStorage.getItem('token')

    return isLogin ?  children : <Redirect to="/login"/>
}

// 路由懒加载封装
const lazyLoad = (path) => {
    const Comp = React.lazy(() => import(`../views/${path}`))
    return(
        <React.Suspense fallback={ <>加载中....</> }>
            <Comp/>
        </React.Suspense>
    )
}

```

# 10.useRouters 使用钩子配置路由
```js
import React from 'react'
import { useRoutes } from 'react-router-dom'
import Redirect from '../components/Redirect'
export default function MRouter() {
    const element = useRoutes([
        {
            path: "/films",
            element: lazyLoad("Film"),
            children:[
                {
                    path: "",
                    element: <Redirect to="/films/NowPlaying"/>
                },
                {
                    path: "nowplaying",
                    element: lazyLoad("films/NowPlaying")
                },
                {
                    path: "comingsoon",
                    element: lazyLoad("films/ComingSoon")
                },
            ]
        },
        {
            path: "/cinemas",
            element: lazyLoad("Cinema")
        },
        {
            path: "/cinemas/search",
            element: lazyLoad("Search")
        },
        {
            path:"/login",
            element: lazyLoad('login')
        },
        {
            path: "/center",
            element: <AuthComponent>{ lazyLoad("Center") }</AuthComponent>
        },
        {
            path: "/detail/:myid",
            element: lazyLoad('Detail')
        },
        {
            path: "/",
            element: <Redirect to="films"/>
        },
        {
            path: "*",
            element: lazyLoad('NotFound')
        }
    ])
    return (
        element
    )
}

//路由拦截组件的封装
const AuthComponent = ({ children }) => {

    const isLogin = localStorage.getItem('token')

    return isLogin ?  children : <Redirect to="/login"/>
}

// 路由懒加载封装
const lazyLoad = (path) => {
    const Comp = React.lazy(() => import(`../views/${path}`))
    return(
        <React.Suspense fallback={ <>加载中....</> }>
            <Comp/>
        </React.Suspense>
    )
}

```

