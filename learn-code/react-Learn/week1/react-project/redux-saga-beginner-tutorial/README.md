# redux-saga-beginner-tutorial
Companion Repo for [Redux/Redux-saga beginner tutorial](https://github.com/redux-saga/redux-saga/blob/master/docs/introduction/BeginnerTutorial.md)

# Instructions

Setup

```
// clone the repo
git clone https://github.com/redux-saga/redux-saga-beginner-tutorial.git

cd redux-saga-beginner-tutorial

npm install
```

Run the demo

```
npm start
```

Run tests

```
npm test
```

# redux-saga 基础概念
## 辅助函数
takeEvery 提供了类似redux-thunk的行为， 允许同一时刻多个任务在执行

takeLatest  如果只是向得到最新的那个请求的响应 只允许一个任务在执行，而且是最后被启动的那个，如果有一个被启动了，那么之前的都会被取消

## 申明式的Effects
call apply

##  dipatch action 
 put函数用于创建dispatch Effect

 ## 错误处理

 ## 高级用法-- 监听未来的action 使用takeEvery和takeLatest   类似与redux-thunk中在组件中调用actionCreator，来控制流程一样










