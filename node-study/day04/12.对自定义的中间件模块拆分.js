const express = require('express')
//导入自己封装的中间件模块
const bodyParser = require('./custom-body-parser')

const app = express()

//定义解析表单数据的中间件
app.use(bodyParser)

app.post('/user', (req, res) => {
    console.log(req.body)
    res.send('ok')
})

app.listen(80, () => {
    console.log('express is running at http://127.0.0.1')
})