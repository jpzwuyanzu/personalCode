### 1,创建react+ts H5项目

#### 1.1  create-react-app myapp --template typescript

### 2,安装sass包

#### 2.1 npm i --save sass

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

#### 4.2创建对应的文件夹以及文件
src/hooks src/views src/utils src/api src/store src/components
src/router src/layout 等目录

#### 4.3构建 router/index.tsx文件



