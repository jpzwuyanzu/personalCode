// 导入http模块
const http = require('http');
// 导入path模块
const path = require('path');
// 导入fs模块
const fs = require('fs');
//创建web服务器request事件
const server = http.createServer();
// 监听web服务器request事件
server.on('request', (req, res) => {
    //获取到客户端请求的url地址
    const url = req.url;
    //预定义一个空白的文件存放路径
    let fpath = '';
    if(req.url === '/') {
        fpath = path.join(__dirname, '/clock/index.html')
    } else {
        fpath = path.join(__dirname, '/clock', url)
    }
    //根据映射过来的文件路径将读取到文件返回给客户端
    fs.readFile(fpath, 'utf8', (err, dataStr) => {
        if (err) res.end('404 Not Found')
        res.end(dataStr)
    })
})
//启动服务器
server.listen('80', () => { console.log('server running at http://127.0.0.1') })