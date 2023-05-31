// 为了方便路由模块化，需要将路由抽离
//1.创建路由对应的js文件
//2.调用express.Router()函数创建路由对象
//3.向路由对象上挂载具体的路由
//4.使用module.exports向外共享路由对象
//5.使用app.use()函数注册路由模块
const express = require('express')
const userRouter = require('./03.router')

const app = express()

// app.use(userRouter)
//注意app.use() 是用来注册全局中间件

app.use('/api',userRouter) //用这个可以为所有的路由添加统一的前缀


app.listen(80, () => {
    console.log('express is running at http://127.0.0.1');
})