//1.导入mysql
const mysql = require('mysql')

//2.建立与mysql数据库的连接关系
const db = mysql.createPool({
    host: '127.0.0.1', //数据库的IP地址
    user: 'root', //登录数据库的账号
    password: '123456789', //数据库密码
    database: 'my_db_01' //要操作的数据库名称
})

// 测试mysql模块更否正常工作

db.query('select 1', (err, results) => {
    //这是mysql模块工作期间报错
    if(err) return console.log(err.message)
    
    //能够成功执行SQL语句
    console.log(results)
})