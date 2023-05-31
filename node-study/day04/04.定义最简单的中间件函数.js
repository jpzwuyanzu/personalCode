const express = require('express')
const app = express()

//定义一个中间件函数
// const mw = (req, res, next) => {
//     console.log('这是最简单的中间件函数');
//     // 把流转关系交给下一个中间件或者路由
//     next()
// }

//方式1:将mw注册为全局生效的中间件
// app.use(mw)

//方式2: 简化的全局中间件方式是直接写在这里
app.use((req, res, next) => {
    console.log('这是最简单的中间件函数');
    // 把流转关系交给下一个中间件或者路由
    next()
})

app.get('/', (req, res) => {
    console.log('调用了/')
    res.send('home page')
})

app.get('/user', (req, res) => {
    console.log('调用了/user')
    res.send('user page')
})

app.listen(80, () => {
    console.log('express is running at http://127.0.0.1')
})