const http = require('http');
const server = http.createServer();

//req里边保存的是和客户端相关的属性， req.url: 请求的url req.method: 请求的方式

server.on('request', (req, res) => {
    const str = `请求url is ${req.url}, 请求的方式: ${req.method}`
    console.log(str)
})
server.listen('8080', () => {
    console.log('server running at http://127.0.0.1:8080')
})