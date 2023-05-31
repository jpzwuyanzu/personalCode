//导入node内置的模块querystring，
const qs = require('querystring')

const bodyParser = (req, res, next) => {
    //定义中间件具体的业务逻辑

    //1. 定义一个str用来存储客户端发送过来的请求体数据
    let str = '';
    //2.监听req的data事件
    req.on('data', (chunk) => {
        str += chunk
    })
    //3.监听req对象的end事件，(请求体发送完毕后会自动触发)
    req.on('end', () => {
        
        // 打印完整的请求体数据
        // console.log(qs.parse(str))

        // 可以解析name=tom&age=20&gender=%E7%94%B7 为 { name: 'tom', age: '20', gender: '男' }
        const body = qs.parse(str);
        req.body = body
        next()
    })
}

module.exports = bodyParser