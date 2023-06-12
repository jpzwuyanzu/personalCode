//导入express模块
const express = require('express')

// 创建express服务器实例
const app = express()

// TODO_01: 请配置Session中间件
const session = require('express-session')
app.use(session({
    secret: 'itheima',
    resave: false,
    saveUninitialized: true
}))

//托管静态页面


//解析POST提交过来的表单数据
app.use(express.urlencoded({ extended: false }))

//登录的API接口
app.post('/api/login', (req, res) => {
    // 判断用户提交的登录信息是否正确
    if(req.body.username !=='admin' || req.body.password !== '000000') {
        return res.send({ status: 1, msg: '登录失败!' })
    }

    //TODO_02：将登录成功之后的用户信息，保存到session中
    //注意只有成功配置了express-session中间件才可以使用req.session这个属性
    req.session.user = req.body; //用户信息
    req.session.isLogin = true; //用户登录状态

    res.send({ status: 0, msg: '登录成功！'})
})



app.listen('80', () => {
    console.log('server in running at http://127.0.0.1:80')
})
