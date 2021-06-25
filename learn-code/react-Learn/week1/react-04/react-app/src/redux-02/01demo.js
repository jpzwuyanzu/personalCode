const redux = require('redux')
// console.log(redux); //createStore(创建仓库)   combineReducers （分模块使用redux）    applyMiddleware 使用中间件
console.log(redux.createStore(() => {})) //至少要传入一个函数  reducer ---纯函数
//dispatch: 触发修改状态的方式
//subscribe: 订阅-- 如果数据改变要以何种方式更新视图
//getState: 获取状态