const express = require('express')
const app = express()

// 定义局部中间件
const mw = (req, res, next) => {
    console.log('局部中间件')
    next()
}

//这样的中间件只会在当前路由中生效
app.get('/', mw,  (req, res) => {
    console.log('/')
    res.send('898989')
})

// 可以使用多个局部中间件, 下边两种写法都可以
// app.get('/', mw, mw1,  (req, res) => {
//     console.log('/')
//     res.send('898989')
// })

// app.get('/', [mw, mw1],  (req, res) => {
//     console.log('/')
//     res.send('898989')
// })



app.get('/user',(req, res) => {
    console.log('/user')
    res.send('898989')
})

app.listen(80, () => {
    console.log('express is running at http://127.0.0.1')
})