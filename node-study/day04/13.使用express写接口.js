const express = require('express')

const app = express()
// 配置解析表单数据的中间件
app.use(express.urlencoded({ extended: false }))



//如果要使用jsonp接口，必须要在cors中间件之前设置jsonp，否者jsonp无效, jsonp只支持get
/**
 * 实现JSONP接口的步骤
 * 1.获取客户端发送赶过来的回调函数的名字
 * 2.得到要通过JSONP形式发送给客户端的数据
 * 3.根据前两部得到的数据，凭借出一个函数调用的字符串
 * 4.把上一步拼接得到的字符串，向应给客户端的<script>标签进行解析执行
 */

app.get('/api/jsonp', (req, res) => {
    // TODO: 定义JSONP接口具体的实现过程
    const funcName = req.query.callback;
    const data = { name: '张三', age: 22 };
    const scriptStr = `${funcName}(${JSON.stringify(data)})`;
    res.send(scriptStr)
})



//一定要在路由之前使用cors中间件，为了解决接口跨域的问题
const cors = require('cors');
/**
 * //origin参数的值指定了允许访问该资源的外部URL
 * 默认情况下CORS仅支持客户端向服务器发送如下的9个请求头
 * CORS响应头：
 * 1. Access-Control-Allow-Origin: <origin>|* 
 * 2. Access-Control-Allow-Headers: 设置请求头，用逗号分隔
 * 默认情况下CORS仅支持客户端发起GET， POST， HEAD请求，如果希望用PUT， DELETE等请求服务器资源，需要在服务器端指明世纪请求允许的HTTP方法
 * 3. Access-Control-Allow-Methods: 请求方式用逗号分隔， 允许所有的话使用 *
 * 
 * CORS分类： 
 * 1.简单请求：
 * 请求方式为GET/POST/HEAD 三者之一
 * HTTP头部信息没有自定义头部字段
 * 2.预检请求：在浏览器服务器通信之前，浏览器会发送OPTION请求进行预检，获知服务器是否允许该世纪请求，服务器响应预检请求之后，才会发送真正的请求，并携带真实的数据
 * 请求方式为GET/POST/HEAD之外的请求METHOD类型， 如DELETE/PUT
 * 请求投中包含自定义头部字段
 * 向服务器发送了application/json格式的数据
 * 
 * 简单请求和预检请求的区别
 * 1. 简单请求客户端和服务器之间只会发生一次请求， 预检请求客户端和服务器间会发生两次请求，OPTION预检请求成功之后，才会发起真正的请求
 * 
 */
app.use(cors())



//导入路由模块
const router = require('./14.apiRouter')
app.use('/api',router)


app.listen(80, () => {
    console.log('express is running at http://127.0.0.1')
})