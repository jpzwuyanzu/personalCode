const fs = require('fs');

// 调用fs.writeFile()方法， 写入文件内容
/**
 * 参数1: 表示文件的存放路径
 * 参数2: 表示要写入的内容
 * 参数3: 表示文件的编码格式 可选参数
 * 参数4（err, datastr）回调函数
 */

fs.writeFile('./files/3.txt', 'ok-123' ,'utf8', (err, datastr) => {
    if(err) {
        // 如果文件写入成功err的值为null， 写入失败为失败的信息对象
        return console.log('写入文件失败:', err) 
    }
    //如果文件写入成功为undefined,
    console.log('写入文件成功:', datastr) 
})