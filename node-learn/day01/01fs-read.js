const fs = require('fs')

//2， 异步读取文件
fs.readFile('1.txt', 'utf-8', (err, data) => {

    if(err) throw err
    console.log('异步读取文件', data)
})

const data = fs.readFileSync('2.txt', 'utf-8')
console.log('同步读取文件', data)