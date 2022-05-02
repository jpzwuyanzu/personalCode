const path = require('path')

const str = 'http: //localhost:8080/dist/index.html'

//获取卢金的最后一部分内容， 一般用来获取文件名称
console.log(path.basename(str)) //index.html

//获取目录名称，路径最后分隔符部分被忽略
console.log(path.dirname(str))

//获取路径