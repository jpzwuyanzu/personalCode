const express = require('express')
const app = express()

//注意： 除了错误级别中间件，其他的都在路由之前

//通过express.json()这个内置中间件解析表单json格式数据
app.use(express.json())

//通过配置express.urlencoded() 这个中间价，来解析表单中的url-encoded格式的数据
app.use(express.urlencoded({ extended: false }))


app.post('/user',  (req, res) => {
    console.log(req)
    // 在服务器可以使用req.body接收客户端发送的json格式数据

    // 默认情况下不配置解析表单数据的中间件，默认req.body是undefined

    // console.log(req.body.name, req.body.age)
    res.send('ok')
})

app.post('/book', (req, res) => {
     // 在服务器可以使用req.body接收客户端发送的json格式数据和url-encoded格式的数据

     //默认情况下不配置解析url-encoded表单数据 req.body为空对象 {}
     console.log(req.body.name, req.body.age)
    res.send('ok')
})



app.listen(80, () => {
    console.log('express is running at http://127.0.0.1')
})