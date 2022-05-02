const fs = require('fs');

fs.writeFile('1.txt', '异步写入代码', (err) => {
    // if(err) {
    //     console.log('出错了' + err)
    // } else {
    //     console.log('写入成功')
    // }
    if (err) throw err //抛出异常
    console.log('写入成功')
})
fs.writeFileSync('2.txt', '同步写入文件')