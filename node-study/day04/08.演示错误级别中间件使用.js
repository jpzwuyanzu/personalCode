const express = require('express')
const app = express()




app.get('/',  (req, res) => {
    throw new Error('服务器内部错误')
    res.send('898989')
})

//定义错误级别中间件，捕获报错， 防止项目崩溃
// 注意这个要放在所有路由注册后边， 不然无法正常工作
// 必须四个参数， err req res next
app.use((err, req, res, next) => {
    console.log(err.message)
    res.send('发生错误' + err.message)
    next()
})

app.listen(80, () => {
    console.log('express is running at http://127.0.0.1')
})