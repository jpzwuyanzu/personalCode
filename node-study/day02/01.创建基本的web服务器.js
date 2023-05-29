// 1. 导入http模块
const http = require('http');
//2. 创建web服务器实例
const server = http.createServer()
//3.为服务器实例绑定request时间，监听客户端的请求
server.on('request', (req, res) => {
    console.log('someone bisiting the server');
})
//4.启动服务器
server.listen('80', () => {
    console.log('server running at http://127.0.0.1:80');
})
