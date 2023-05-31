const express = require('express')

//导入解析表单数据的中间件body-parser
const parser = require('body-parser')

const app = express()

app.use(parser.urlencoded({ extended: false }))

app.post('/user',  (req, res) => {
    // 如果没有配置任何解析表单的中间件，req.body默认为undfined

    console.log(req.body)
    res.send('ok')
})



app.listen(80, () => {
    console.log('express is running at http://127.0.0.1')
})