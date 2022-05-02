const fs = require('fs')

fs.stat('1.txt', (err, stat) => {
    if(err) throw err
    console.log('file:', stat.isFile()) //是否是文件 true 
    console.log('directory: ', stat.isDirectory()) //是否是目录或者文件夹 false
    console.log('size: ', stat.size) // 文件大小 39
})

//异步删除文件
fs.unlink('2.txt', (err) => {
    if(err) throw err
    console.log('删除成功')
})