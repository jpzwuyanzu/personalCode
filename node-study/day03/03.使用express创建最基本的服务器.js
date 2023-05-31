// 导入express
const express = require('express');

//创建web服务器
const app = express()

//监听客户端的get和post请求，并向客户端响应
app.get('/user', (req, res) => {
    //调用express提供的res.send()方法向客户端响应一个json对象
    res.send({ name: 'tom', age: '20',gender: '男' })
})

app.post('/user', (req, res) => {
    //调用express提供的res.send()方法向客户端响应一个文本字符串
    res.send('请求成功')
})

app.get('/', (req, res) => {
    //通过req.query可以获取到客户端传递的参数，默认req.query是一个空对象
    res.send(req.query)
})

app.get('/user/:id/:name', (req, res) => {
    // 可以通过 :参数名称获取url后边的动态参数 通过req.params获取
    console.log(req.params)
    res.send(req.params)
})

//启动web服务器

app.listen(80, () => {
    console.log('express running at http://127.0.0.1')
})

