#### 项目目的

+  该项目是个人学习完react基础之后做了一个模版，主要是想通过该项目熟悉react开发流程，以及熟悉antdui和redux的使用，后期会持续更新

#### 项目中涉及的技术

+ react  构建ui jsx
+ react-router  配置路由 路由使用了懒加载
+ react-redux  state容器
+ redux  管理state
+ redux-thunk  中间件异步操作
+ immutable 创建持久化数据
+ redux-immutable 
+ ant-design  UI组件
+ echarts 图表
+ braft-editor  富文本
+ es6
+ nprogress
+ js-cookie
+ axios

#### 实现了对登录状态模拟的钩子拦截

+ 1，在路由钟对登录状态loginState的判断，
+ 2，对于axios中对于token是否的判断

#### 对侧边栏的渲染以及路由的渲染进行权限判断
 + Sidemenus.jsx 不符合权限的不会 渲染
 + RouterView.jsx 不符合权限的会直接重定向到403页面
 + App.jsx 添加403页面路由
 + menus.js 添加auth标识符
 
#### 描述

 + 项目中对axios进行了封装，但是并没有使用，登录请求使用的fetch
 + 项目中的用户信息为本地mock数据，一共包含两种角色
+ admin
+ visitor
+ 登录账号可以使用 admin 或者是 vistor 密码随意即可， 用户登录的信息会保存在cookie中

#### 安装依赖

yarn install 

#### 运行

yarn start