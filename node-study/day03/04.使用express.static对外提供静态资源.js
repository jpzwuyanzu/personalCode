const express = require('express');

const app = express()

//资源会按照托管顺序去查询，谁在前面就先查找谁
//在这调用express.static() 快速对外提供静态资源
// app.use(express.static('public')) //http://127.0.0.1/logo512.png
//多次托管多个文件夹，就调用多次就可以了
// app.use(express.static('other')) 

//可以通过下边的方式在访问路径前加一个路径
app.use('/public',express.static('public')) //http://127.0.0.1/public/logo512.png




app.listen(80, () => {
    console.log('express is running at 127.0.0.1')
})