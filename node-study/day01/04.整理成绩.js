// 导入fs
const fs = require('fs');

fs.readFile('./素材.txt', 'utf8', (err, dataStr) => {
    // 判断是否读取成功
    if(err) {
        return console.log('读取失败:', err)
    }
    console.log('读取成功:', dataStr)
    // 先把成绩数据按照空格分割， 循环分割后的数组，对每一项数据进行字符串替换操作
    const arrOld = dataStr.split(' ');
    const arrNew = [];
    arrOld.forEach((itm) => {
        arrNew.push(itm.replace('=', ':'))
    })
    const newStr = arrNew.join('\n');
    //调用写入处理完的数据
    fs.writeFile('./files/成绩-ok.txt', newStr, 'utf8', (err) => {
        if(err) {
            return console.log('写入文件失败:', err.message)
        }
        console.log('成绩写入成功')
    })
})