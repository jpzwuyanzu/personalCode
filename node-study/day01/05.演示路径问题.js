const fs = require('fs');

//出现路径拼接错误的问题，是因为使用了相对路径， 
//如果要解决这个问题，需要提供一个完整的文件存放路径

// __dirname: 代表的是当前文件所处的目录

fs.readFile(__dirname + '/files/1.txt', 'utf8', (err, dataStr) => {
    if(err) {
        return console.log('读取失败:', err)
    }
    console.log('读取成功:', dataStr)
})