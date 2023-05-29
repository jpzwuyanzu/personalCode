const fs = require('fs');
/**
 * 参数1: 读取文件存放路径
 * 参数2: 读取文件编码格式 utf8
 * 参数3: 回调函数，拿到读取失败和成功的结果err， datastr
 */

fs.readFile('./files/1.txt', 'utf8', (err, datastr) => {
    console.log('err:', err) // 如果读取成功则err为null， 如果读取失败，则err为错误对象
    console.log('datastr:',datastr)  // 如果读取失败，则为 undefined
})

