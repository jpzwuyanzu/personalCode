const fs = require('fs')
fs.appendFile('1.txt', '异步追加的代码', (err) => {
    if (err) throw err
    console.log('异步追加的代码成功')
})

fs.appendFileSync('2.txt', '同步追加代码')