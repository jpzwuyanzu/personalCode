const express = require('express')
//导入路由模块
const router = require('./14.apiRouter')

const app = express()

app.use('/api',router)


app.listen(80, () => {
    console.log('express is running at http://127.0.0.1')
})