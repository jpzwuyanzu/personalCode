const express = require('express')
const app = express()

// 多个中间件之间共享一份req和res， 我们可以在上游的中间件中统一为req和res添加自定义的属性和方法，供下游中间件使用
app.use((req, res, next) => {
    const time = Date.now()
    //为req挂载自定义属性，从而吧时间共享给后边的中间件或者路由
    req.startTime = time;
    // 把流转关系交给下一个中间件或者路由
    next()
})

app.get('/', (req, res) => {
    res.send('home page'+ req.startTime)
})

app.get('/user', (req, res) => {
    res.send('user page'+ req.startTime)
})

app.listen(80, () => {
    console.log('express is running at http://127.0.0.1')
})