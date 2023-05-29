const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
    //调用res.end()向客户端返回响应信息
    const str = `url is ${req.url} method is ${req.method}`
    res.end(str)

})
server.listen('80', () => {
    console.log('server is running at 127.0.0.1')
})