const path = require('path');

const  fs = require('fs');

// 注意 ../ 可以抵消前面的路径

//涉及到路径拼接的时候都用path.join()拼接

const pathStr = path.join('/a', '/b/c', '../', './d', 'e');
console.log(pathStr)

fs.readFile(path.join(__dirname, '/files/1.txt'), 'utf8' ,(err, dataStr) => {
    if(err) {
        return console.log('读取失败:', err)
    }
    console.log('读取成功:', dataStr)
})