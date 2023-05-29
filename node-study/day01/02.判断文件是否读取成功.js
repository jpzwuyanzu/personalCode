const fs = require('fs');

fs.readFile('./files/1.txt', 'utf8', (err, result) => {
    if(err) {
        return console.log('文件读取失败:', err.message);
    }
    console.log('文件读取成功:', result) // 文件读取成功为文件的内容
})