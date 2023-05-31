const express = require('express')
const app = express()

// 执行顺序是按照中间件的定义顺序

//定义第一个全局中间件
app.use((req, res, next) => {
    console.log('第一个全局中间件')
    next()
})
//定义第二个全局中间件
app.use((req, res, next) => {
    console.log('第二个全局中间件')
    next()
})
app.get('/',(req, res) => {
    res.send('898989')
})

app.listen(80, () => {
    console.log('express is running at http://127.0.0.1')
})