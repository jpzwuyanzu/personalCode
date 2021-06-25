17/18/19年用Dva的比较多

# 1，介绍
dva 首先是一个基于 redux 和 redux-saga 的数据流方案，然后为了简化开发体验，dva 还额外内置了 react-router 和 fetch，所以也可以理解为一个轻量级的应用框架。

# 特性
易学易用，仅有 6 个 api，对 redux 用户尤其友好，配合 umi 使用后更是降低为 0 API
elm 概念，通过 reducers, effects 和 subscriptions 组织 model
插件机制，比如 dva-loading 可以自动处理 loading 状态，不用一遍遍地写 showLoading 和 hideLoading
支持 HMR，基于 babel-plugin-dva-hmr 实现 components、routes 和 models 的 HMR

# 2， 安装 dva-cli
通过 npm 安装 dva-cli 并确保版本是 0.9.1 或以上。
$ npm install dva-cli -g
$ dva -v

# 3，创建项目

$ dva new dva-quickstart

npm start 

# 4， 配置ui库

* 安装依赖
npm install antd babel-plugin-import --save

* 编辑 .webpackrc，使 babel-plugin-import 插件生效。

```
{
+  "extraBabelPlugins": [
+    ["import", { "libraryName": "antd", "libraryDirectory": "es", "style": "css" }]
+  ]
}
```

* 重新启动项目

# 5，项目完成

### 5.1 创建了src/routes/Product.js组件

```js
import React from 'react'
import ProductList from './../components/ProductList'
function Product() {
    return (
        <div>
            <ProductList/>
        </div>
    )
}
export default Product
```

#### 5.2 然后需要注册路由，在src/router.js中

```js
import React from 'react';
import { Router, Route, Switch } from 'dva/router';
import IndexPage from './routes/IndexPage';
import Product from './routes/Product'

function RouterConfig({ history }) {
  return (
    <Router history={history}>
      <Switch>
      <Route path="/product" exact component={Product} />
        <Route path="/" exact component={IndexPage} />
      </Switch>
    </Router>
  );
}

export default RouterConfig;

```

### 5.3 创建src/components/ProductList.js组件

```js
import React from 'react'

import { Table } from 'antd'

function ProductList ({ prolist }) {
    console.log(prolist)

    const columns = [
        {
            title: '序号',
            render: (text, record, index) => <span>{ index+1 }</span>
        },
        {
            title: '产品名称',
            key: 'proname',
            dataIndex: 'proname'
        }
    ]
    return (
        <Table dataSource={ prolist } columns={ columns } rowKey = { item => item.id } />
    )
}

export default ProductList
```

### 5.4 封装数据请求
 src/service/example.js

 ```js
import request from '../utils/request';

export function query() {
  return request('/api/users');
}

export function getProlist() {
  return request('http://localhost:3000/prolist')
}
 ```

 ### 5.5 创建状态管理
 src/models/products.js
 ```js
import { getProlist } from './../services/example'
export default {
    namespace: 'products',
    state: {
        prolist:[]
    },
    reducers: {
        changeProlist (state, action) {
            return{ ...state, prolist: action.payload }
        }
    },
    effects: {
        * getProlistFn (params, {call, put}) {
            const res = yield call(getProlist)
            console.log(res)
            yield put ({
                type: 'changeProlist',
                payload: res.data
            })
        }
    },
    subscriptions:{ 
        setup({dispatch, history}) {
            return history.listen(({ pathname }) => {
                if(pathname === '/product') {
                    // dispatch({
                    //     type: 'getProlistFn'
                    // })
                }
            })
        }
    }
}
 ```

 * 这里的dispatch可以通过路由判断触发，也可以在组件中触发

 ### 5.6，开启数据流
  src/index.js

  ```js
  import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);
app.model(require('./models/products').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');

  ```

### 5.7 渲染数据

src/routes/Product.js

```js
import React, { useEffect } from 'react'
import ProductList from './../components/ProductList'
import { connect } from 'dva'

function Product({ dispatch, prolist }) {

    useEffect(() => {
        dispatch({
            type: 'products/getProlistFn'
        })
    }, [])

    return (
        <div>
            <ProductList prolist={ prolist } />
        </div>
    )
}

export default connect(
    ({ products: { prolist }}) => {
        // console.log(obj)
        return {
            prolist
        }
    }
)(Product)
```

# 6 熟悉dva的相关概念




