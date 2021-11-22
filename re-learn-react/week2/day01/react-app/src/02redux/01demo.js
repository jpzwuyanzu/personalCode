const redux = require('redux')

// console.log(redux)// createStore ： 创建仓库+  combineReducers： 使用中间件+  applyMiddleware： 分模块使用redux

console.log(redux.createStore(() => {})) //至少要传一个函数--reducer--必须是一个纯函数
// dispatch： 触发修改状态的方式
//subscribe： 订阅-- 如果数据该拜年，要以何种方式更新视图
// getState： 获取状态