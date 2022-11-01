
### 1,创建react+ts PC后管项目

#### 1.1 create-react-app myapp --template typescript

### 2,安装sass包

#### 2.1  npm i --save sass 

### 3,本地开发配置代理解决跨域问题

#### 3.1  创建src/setupProxy.js

#### 3.2  yarn add http-proxy-middleware

#### 3.3  setupProxy.js
```js
    const { createProxyMiddleware } = require('http-proxy-middleware');

    module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
        target: 'http://localhost:5000',
        changeOrigin: true,
        })
    );
    };
```

### 4,路由架构

#### 4.1 安装路由 yarn add react-router-dom --save-dev

#### 4.2 封装Redirect组件
src/components/Redirect.tsx
```tsx
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Redirect = ({ to }: any) => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate(to, { replace: true })
    },[])
    return null
}

export default Redirect
```

#### 4.3 src/router/index.tsx

```tsx
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
```



### 5,Antd引入

#### 5,1 yarn add antd 

#### 5,2 引入antd的样式

### 6，改造TopHeader组件和SideMenu组件

TopHeader.tsx
```tsx
import React, { useState } from 'react'
import { Layout, Dropdown, Menu, Space, Avatar } from 'antd'
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    UserOutlined
  } from "@ant-design/icons";
const { Header } = Layout;

export default function TopHeader() {

    const [collapsed, setCollapsed] = useState(false);
    const menu = (
        <Menu
          items={[
            {
              key: '1',
              label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                  超级管理员
                </a>
              ),
            },
            {
              key: '2',
              danger: true,
              label: '退出',
            },
          ]}
        />
      );

    const changeCollapsed = () => {
        setCollapsed(!collapsed)
    }

    return (
        <Header className="site-layout-background" style={{ padding: '0 16px' }}>
          {
            collapsed ? <MenuUnfoldOutlined onClick={ changeCollapsed } /> : <MenuFoldOutlined onClick={ changeCollapsed } />
          }
          <div style={{ float: 'right' }}>
              <span>欢迎Admin回来</span>
              <Dropdown overlay={menu}>
                <a onClick={e => e.preventDefault()}>
                <Space>
                    <Avatar size="large" icon={<UserOutlined />} />
                </Space>
                </a>
            </Dropdown>
          </div>
        </Header>
    )
}

```

SideMenu.tsx
```tsx
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { Layout, Menu } from "antd";
import { useAppSelector } from './../hook/hooks'
import {
    HomeOutlined,
    UsergroupAddOutlined,
    UserOutlined,
    MessageOutlined,
    CheckSquareOutlined,
    CloudUploadOutlined
} from "@ant-design/icons";
import { useNavigate, useLocation } from 'react-router-dom'
import './SideMenu.scss'
import axios from 'axios';
import type { MenuProps } from 'antd';
const { Sider } = Layout;
const IconList: any = {
    '/home': <HomeOutlined />,
    '/user-manage': <UserOutlined />,
    '/right-manage': <UsergroupAddOutlined />,
    '/news-manage': <MessageOutlined />,
    '/audit-manage': <CheckSquareOutlined />,
    '/publish-manage': <CloudUploadOutlined />
}
const rootSubmenuKeys: any = []
export default function SideMenu() {
  const [menuList, setMenuList] = useState([]);
  const [openParentKeys, setOpenParentKeys] = useState(['']);
  const [openKeys, setOpenKeys] = useState([''])
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const defaultOpenKeys = ['/' + pathname.split('/')[1]]
  const collapsed =  useAppSelector((state) => state.collapse.status)
  const filterMenu = (menuArr: any) => {
     menuArr.forEach((item: any, index: any) => {
            item.icon = IconList[item.key]
     })
     return menuArr
  } 
 
  const onOpenChange = (keys: any) => {
    const latestOpenKey: any = keys.find((key: any) => openParentKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenParentKeys(keys);
    } else {
      setOpenParentKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };
  useEffect(() => {
    const username = JSON.parse((localStorage.getItem('token') as any))[0]['username'];
    axios.get('menu.json').then(res => {
        let tempArr: any = filterMenu(res.data[username])
        tempArr.forEach((item: any) => {
          rootSubmenuKeys.push(item.key)
        })
        setOpenParentKeys(defaultOpenKeys)
        setMenuList(tempArr)
    })
  }, [])
  return (
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div style={{display: 'flex', height: '100%', flexDirection: 'column'}}>
        <div className="logo">{ !collapsed ? '新闻发布系统' : '新闻' }</div>
        <div style={{ flex: 1, overflow: 'hidden'}}>
            <Menu
                theme="dark"
                mode="inline"
                // defaultSelectedKeys={[pathname]}
                openKeys={openParentKeys}
                selectedKeys={[pathname]}
                defaultOpenKeys={defaultOpenKeys}
                items={menuList}
                onClick={ (e) => {
                    navigate(e.key)
                }}
                onOpenChange={ onOpenChange }
            />
        </div>
      </div>
    </Sider>
  );
}
```

### 7,JSON Server 
 
 npm install -g json-server
 ```tsx
 // post 新增
 axios.post('http://localhost:3000/posts/',{
    title: 'test',
    author: 'tony'
})
// 查询
axios.get('http://localhost:3000/posts/',{
    title: 'test',
    author: 'tony'
})
//整个替换
axios.put('http://localhost:3000/posts/',{
    title: 'test',
    author: 'tony'
})
// 更新部分
axios.patch('http://localhost:3000/posts/',{
    title: 'test',
    author: 'tony'
})
// 删除
axios.delte('http://localhost:3000/posts/1')

//_embed 多表关联查询，向下关联
axios.get('http://localhost:3000/posts?_embed=comments',{
    title: 'test',
    author: 'tony'
})

//_expand 多表关联查询，向上关联
axios.get('http://localhost:3000/comments?_expand=posts',{
    title: 'test',
    author: 'tony'
})

 ```

### 8, 添加nprogress 

npm install --save nprogress @types/nprogress

封装Loading.tsx组件
```tsx
import React, { useEffect } from 'react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'


export default function Loding() {
    useEffect(() => {
        NProgress.start()
        return () => {
            NProgress.done()
        }
    }, [])
    return (<div></div>)
}
``` 
在Suspense 的fallback中使用





### 9,构建登录页面
/login.tsx

```tsx
import React from 'react'
import { Button, message, Form, Input } from 'antd'
import { useNavigate } from 'react-router-dom'
import './login.scss'
import axios from 'axios'

const Login = () =>  {
    const navigate = useNavigate();
    const onFinish = (values: any) => {
        Promise.all([
            axios.get('user1.json'),
            axios.get('routeRight.json')
        ]).then(res => {
            if(res[0].data[values.username]) {
                message.success('登录成功')
                localStorage.setItem('token', JSON.stringify(res[0].data[values.username]));
                localStorage.setItem('rights', JSON.stringify(res[1].data[values.username]));
                navigate('/home')
            } else {
                message.error('该用户不存在')
            }
            
        })
      };
    
      const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
      };
    return (
        <div className="loginForm-Container">
            <div className="login-part">
                <h1 className="loginForm-title">新闻发布系统</h1>
            <Form
                name="basic"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
                >
                <Form.Item
                    name="username"
                    rules={[{ required: true, message: '请输入用户名!' }]}
                >
                    <Input placeholder="请输入用户名!" />
                </Form.Item>

                <Form.Item
                    name="password"
                    rules={[{ required: true, message: '请输入密码!' }]}
                >
                    <Input.Password placeholder="请输入密码!" />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                    登录
                    </Button>
                </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default Login
```

### 10, 路由权限，封装RouterView组件
/componnents/RouterView.tsx
```tsx
import React, { useState, useEffect } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import NotFind from '../views/404/NotFound'

const RouterView = () => {
    const [hasRights, setHasRights] = useState(false);
    const { pathname } = useLocation();
    const routeRights = JSON.parse((localStorage.getItem('rights') as any));
    useEffect(() => {
        routeRights.includes(pathname) ? setHasRights(true) : setHasRights(false)
    } ,[pathname, routeRights])
    return (
        <>
         { hasRights ?  <Outlet/> : <NotFind/>}
        </>
    )
}

export default RouterView
```

### 11, 构建编写新闻组件，使用富文本编辑器以及步骤条组件

#### 11.1 安装draft 以及对应的申明文件

npm install --save react-draft-wysiwyg draft-js

npm install --save draftjs-to-html

npm install --save @types/draft-js

npm install --save @types/react-draft-wysiwyg

npm install --save @types/draftjs-to-html

```tsx
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
<Editor
  editorState={editorState}
  toolbarClassName="toolbarClassName"
  wrapperClassName="wrapperClassName"
  editorClassName="editorClassName"
  onEditorStateChange={this.onEditorStateChange}
/>;
```
Add.tsx
```tsx
import React, { useState, useEffect, useRef } from 'react'
import { PageHeader, Steps, Button, Space, Form, Input, Select, message } from 'antd'
import { useNavigate } from 'react-router-dom'
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import style from './add.module.scss'
const { Step } = Steps;
const { Option } = Select;

export default function Add() {

    const [current, setCurrent] = useState(0);
    const [category, setCategory] = useState([]);
    const [editorState, setEditorState] = useState(undefined)
    const addFormRef: any = useRef(null);
    const navigate = useNavigate();

    const handleNext = () => {
        if(current === 0) {
            addFormRef.current.validateFields()
            .then((res: any) => {
                setCurrent(current + 1)
            }).catch((error: any) => {
                console.log(error)
            })
        } else if(current === 1) {
            if(draftToHtml(convertToRaw((editorState as any).getCurrentContent())) === '' || draftToHtml(convertToRaw((editorState as any).getCurrentContent())).trim() === '<p></p>') {
                message.error('新闻内容不能为空!')
            } else {
                setCurrent(current + 1)
            }
        } else {
            setCurrent(current + 1)
        }
    }
    const handlePrevious = () => {
        setCurrent(current - 1)
    }
    const editorStateChange = (value: any) => {
        setEditorState(value)
    }
    const handleblurEdit = () => {
        console.log(draftToHtml(convertToRaw((editorState as any).getCurrentContent())))
    }
    const handleSaveNews = (status: number) => {
        if(status === 0) {
            navigate('/news-manage/draft')
        } else {
            navigate('/audit-manage/list')
        }
    }

    useEffect(() => {
        fetch('category.json').then(res => res.json()).then(res => {
            setCategory(res.categories)
        })
    }, [])

    return (
        <>
            <PageHeader className="site-page-header" title="撰写新闻"/>
            <div style={{ marginTop: '20px' }}>
                <Steps current={ current }>
                    <Step title="新闻标题" description="标题分类" />
                    <Step title="新闻内容" description="新闻内容" />
                    <Step title="新闻提交" description="新闻提交" />
                </Steps>
                <div style={{ marginTop: '50px',marginBottom: '50px' }}>
                <div className={ current > 0 ? style.hidenStep : ''}>
                <Form
                    name="basic"
                    labelCol={{ span: 6 }}
                    wrapperCol={{ span: 18 }}
                    autoComplete="off"
                    style={{ width: '600px' }}
                    ref={ addFormRef }>
                    <Form.Item
                        label="新闻标题"
                        name="title"
                        rules={[{ required: true, message: '请输入新闻标题!' }]}>
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="新闻分类"
                        name="categoryId"
                        rules={[{ required: true, message: '请选择新闻分类!' }]}>
                        <Select>
                            {
                                category.map((item: any) => <Option value={ item.id } key={ item.id }>{ item.title }</Option>)
                            }
                        </Select>
                    </Form.Item>
                    </Form>
                </div>
                <div className={ current !== 1 ? style.hidenStep : ''}>
                    <Editor
                    editorState={editorState}
                    toolbarClassName="toolbarClassName"
                    wrapperClassName="wrapperClassName"
                    editorClassName="editorClassName"
                    onEditorStateChange={editorStateChange}
                    onBlur = { handleblurEdit }
                    />
                </div>
                </div>
                <div>
                    <Space>
                    {
                        current > 0 && <Button type="primary" onClick={ () => handlePrevious() }>上一步</Button>
                    }
                    {
                        current < 2 && <Button onClick={ () => handleNext() }>下一步</Button>
                    }
                    {
                        current === 2 && <><Button onClick={ () => handleSaveNews(0) }>保存草稿</Button><Button type="primary" danger onClick={ () => handleSaveNews(1) }>提交审核</Button></>
                    }
                    </Space>
                </div>
            </div>
        </>
    )
}

```

### 12.Redux Toolkit 学习

教程地址：https://www.bilibili.com/video/BV1Ju411o779/?spm_id_from=333.788


#### 12.1新项目中使用ReduxTookit 

```
1,新项目中集成

##### 1.1，npx create-react-app my-app --template redux  创建javascript 模版

##### 1.2, npx create-react-app my-app --template redux-typescript  创建typescript模版

2, 现有项目集成

##### 2.1, npm install @reduxjs/toolkit react-redux
```

#### 12.2创建slice文件
/src/store/collapse.slice.ts
```ts
import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';
//createSlice 用于创建状态切片

// Define a type for the slice state
interface CollapseState {
    status: boolean,
    list: Array<any>
  }
  
  // Define the initial state using that type
  const initialState: CollapseState = {
    status: false,
    list: []
  }

//  reduxToolkit 处理异步状态管理, 使用中间件的方式来实现
  export const loadTodos: any = createAsyncThunk('collapse/loadTodos', (payload: string) => {
    try {
        return axios.get(payload).then(res => res.data);
    } catch {
        throw new Error('自定义错误信息')
    }
  })

//actions: 对象类型，用于存储action creator函数
const { actions, reducer: CollapseReducer } = createSlice({
    // name 将会作为action 对象中type属性值的前缀
    // { type: 'collapse/switchCollapsed' }
    name: 'collapse',
    // 初始状态
    initialState: initialState,
    // reducer 函数配置
    reducers: {
        // 修改状态的任务
        switchCollapsed: (state: CollapseState) =>  {
            // 此处可以直接对状态进行操作
            // 因为内部集成了不可变的数据结构，所以此处并不会改变原有状态，
            // 而是返回了新的状态，只不过内部帮我们自动赋值了新的状态
            state.status = !state.status;
        }
    },
    extraReducers: {
        [loadTodos.pending] () {
            console.log('pending')
        },
        [loadTodos.fulfilled] (state, action) {
            console.log('fulfilled')
            state.list = [...action.payload.categories]
            console.log(state.list)
        },
        [loadTodos.rejected] () {
            console.log('rejected')
        }
    }
})
 
// 导出action creator 函数
 export const { switchCollapsed } = actions;

 // 导出reducer函数
 export default CollapseReducer;
```

#### 12.3 创建store文件

// 当使用redux-persist数据持久化的时候，需要在react-app-env.d.ts中添加一个申明
```ts
/// <reference types="react-scripts" />

/// <reference types="redux-persist" />
```

src/store/index.ts
```ts
// configureStore: 用于创建，配置store对象的方法
import { configureStore } from '@reduxjs/toolkit'
// 导入CollapseReducer， 用于配置store对象
import CollapseReducer from './slices/collapse.slice'
// 引入日志中间件
import logger from 'redux-logger'
// 定义状态名称常量
import { COLLAPSE_FEATURE_KEY } from './slices/collapse.slice'

// redux数据持久化
import storage from 'redux-persist/lib/storage'
import { persistStore ,persistReducer } from 'redux-persist'

const persistConfig = {
    key: 'root',
    storage,
    blcklist: ['page404']
}
const persistCollapseReducer = persistReducer(persistConfig, CollapseReducer)

// 创建，配置，导出store对象
const store = configureStore({
    // reducer选项用于替换原有的combineReducer方法
    // 用于合并应用中的多个reducer函数，组成最终的store对象
    reducer: {
        [COLLAPSE_FEATURE_KEY]: persistCollapseReducer
    },
    // 配置中间件
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({ serializableCheck: false })
    ]
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
// redux数据持久化
export const persistor = persistStore(store)
export default store;
```

#### 12.4 使用react-redux中的Provider组件连接视图组件和状态组件
src/index.tsx
```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { Provider } from 'react-redux'
import store from './store/index'
import { persistor } from './store/index'
import { PersistGate } from 'redux-persist/integration/react'
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
// root.render(
//   <React.StrictMode>
//     <Provider store={ store }>
//       <App />
//      </Provider>
//   </React.StrictMode>
// );
root.render(
  <Provider store={ store }>
    <PersistGate loading={ null } persistor={ persistor }>
    <App />
    </PersistGate>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```





