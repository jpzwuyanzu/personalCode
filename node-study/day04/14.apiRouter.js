const express = require('express')

const router = express.Router()

//在这里挂载对应的路由
router.get('/get', (req, res) => {
    // 通过req.query获取客户端通过查询字符串，发送到服务器的数据
    const query = req.query;
    // 调用res.send()向客户端响应处理结果

    res.send({
        status: 0, //0 表示处理成功 1 表示处理失败
        msg: '处理成功!', //状态描述
        data: query //需要响应给客户端的数据
    })
})

//定义post接口
router.post('/post', (req, res) => {
    //通过req.body 获取请求体中包含的url-encoded 格式的数据
    const body = req.body
    
    //调用res.send() 向客户端返回数据
    
})



module.exports = router