const http = require('http');
const server = http.createServer();

//根据不同的url请求返回不同的数据
server.on('request', (req, res) => {
    // 1.获取请求的url
    const url = req.url;
    // 2.设置默认的相应内容为404 NotFound
    let content = '<h1>404 Not Found</h1>'
    // 3. 判断用户请求的是否是/ 或/index.html 首页
    if(url === '/' || url === '/index.html') {
        content = '<h1>首页</h1>'
    } else if(url === '/about.html') {
    // 4. 判断用户请求的是都是 /about.html 关于页面
        content = '<h1>关于页面</h1>'
    }
    // 5. 设置Content-Type 响应头信息，防止中文乱码
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // 6. 使用res.end() 把内容响应给客户端
    res.end(content)
})
server.listen('80', () => {
    console.log('server running at http://127.0.0.1');
})