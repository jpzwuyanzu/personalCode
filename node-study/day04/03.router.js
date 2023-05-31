//路由模块
//导入express
const express = require('express')

//创建路由对象
const router = express.Router();

// 挂载具体的路由
router.get('/user/list', (req, res) => {
    res.send('get 用户列表')
})
router.post('/user/add',(req, res) => {
    res.send('post add user')
})

//向外导出路由对象
module.exports = router

