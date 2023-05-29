const http = require('http');
const server = http.createServer();
server.on('request', (req, res) => {
    console.log('someone is visiting the server')
    //发送到客户端的内容包含中文，为了防止显示乱码的问题，需要设置相应投Content-Type 的值为text/html;charset=utf-8
    const str = `你的请求url地址是：${req.url}, 请求的method类型是：${req.method}`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    //把包含中文的内容响应给客户端

    res.end(str)
})
server.listen('80', () => {
    console.log('server is running at http://127.0.0.1');
})