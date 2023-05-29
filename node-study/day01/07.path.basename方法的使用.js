const path = require('path');

const fpath = 'a/b/c/index.html';

const fullName = path.basename(fpath); //获取文件名称，包含扩展名
console.log(fullName)

const nameWithoutExt = path.basename(fpath, '.html'); //第二个参数可以删除扩展名，只获取文件名称
console.log(nameWithoutExt)