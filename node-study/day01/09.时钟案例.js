// 导入fs模块
const fs = require('fs');

// 导入path模块
const path = require('path');

//定义正则表达式， 分别匹配<style></style> 和 <script></script>标签
const regStyle = /<style>[\s\S]*<\/style>/;
const regScript = /<script>[\s\S]*<\/script>/;

fs.readFile(path.join(__dirname, './index.html'), 'utf8', (err, dataStr) => {
    if (err) {
        return console.log('读取文件失败:', err);
    }
    //读取文件成功后，调用对应的三个方法，分别拆解出css， js， html文件
    // console.log(dataStr)
    resolveCss(dataStr)
    resolveJs(dataStr)
    resolveHtml(dataStr)
})

//定义处理css样式的方法
const resolveCss = (htmlStr) => {
    //使用正则提取需要的内容
    const r1 = regStyle.exec(htmlStr)
    //将提取出来的字符串replace 替换操作
    const newCss = r1[0].replace('<style>', '').replace('</style>', '');
    //调用fs.writeFile()将提取的样式写入到clock 的index.css文件中
    fs.writeFile(path.join(__dirname, './clock/index.css'), newCss, (err, dataStr) => {
        if (err) return console.log('写入样式文件失败:', err)
        console.log('写入样式文件成功')
    })
}

//定义处理js脚本的方法
const resolveJs = (htmlStr) => {
    // 通过正则处理javascript脚本
    const r2 = regScript.exec(htmlStr);
    const newJs = r2[0].replace('<script>', '').replace('</script>', '');
    fs.writeFile(path.join(__dirname, './clock/index.js'), newJs, (err, dataStr) => {
        if(err) return console.log('写入index.js文件失败', err)
        console.log('写入index.js文件成功')
    })
}

//定义处理html文件的方法
const resolveHtml = (htmlStr) => {
    const newHtml = htmlStr.replace(regStyle, '<link rel="stylesheet" href="./index.css" />').replace(regScript, '<script src="./index.js"></script>');
    fs.writeFile(path.join(__dirname, './clock/index.html'), newHtml, (err, dataStr) => {
        if(err) return console.log('写入index.html文件失败', err)
        console.log('写入index.html文件成功')
    })
}
