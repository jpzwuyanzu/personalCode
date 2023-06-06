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
// db.query('select 1', (err, results) => {
//     //这是mysql模块工作期间报错
//     if(err) return console.log(err.message)
    
//     //能够成功执行SQL语句
//     console.log(results)
// })


//查询users表中所有的用户
// const sqlstr = "select * from users";
// db.query(sqlstr, (err, results) => {
//     if(err) return console.log(err.message)
//     //查询请求成功
//     //注意如果执行select查询语句，返回的结果是一个数组
//     console.log(results)
// })


// //向users表中新增一条数据，username为Spider-Man， password的值为 test123

// const user = { username: 'Super-Man', password: 'test123' };

// //定义待执行的sql语句, 其中英文的? 表示占位符

// const sqlstr = 'insert into users (username, password) values (?, ?)';

// //执行sql语句

// db.query(sqlstr, [user.username, user.password], (err, results) => {
//     // 执行sql语句失败
//     if(err) return console.log(err.message)
//     //数据插入成功了,需要通过results.affectedRows来判断
//     /**
//      * {fieldCount: 0,
//         affectedRows: 1,
//         insertId: 10,
//         serverStatus: 2,
//         warningCount: 0,
//         message: '',
//         protocol41: true,
//         changedRows: 0 }
//      */
//     // 注意： 如果执行的是insert into 插入语句， 则results是一个对象，可以通过 results.affectedRows来判断
//     if(results.affectedRows === 1) {
//         console.log('插入数据成功', results);
//     }

// })


//插入数据的快捷方式
//向users表中新增一条数据，username为Spider-Man， password的值为 test123

// const user = { username: 'Super-Man2', password: 'test123' };

// //定义待执行的sql语句, 其中英文的? 表示占位符

// const sqlstr = 'insert into users set ?';

// //执行sql语句

// db.query(sqlstr, user, (err, results) => {
//     // 执行sql语句失败
//     if(err) return console.log(err.message)
//     //数据插入成功了,需要通过results.affectedRows来判断
//     /**
//      * {fieldCount: 0,
//         affectedRows: 1,
//         insertId: 10,
//         serverStatus: 2,
//         warningCount: 0,
//         message: '',
//         protocol41: true,
//         changedRows: 0 }
//      */
//     // 注意： 如果执行的是insert into 插入语句， 则results是一个对象，可以通过 results.affectedRows来判断
//     if(results.affectedRows === 1) {
//         console.log('插入数据成功', results);
//     }

// })



//演示如何更新用户的信息
// const user = { id: 5, username: 'aaa', password: 'bbb' };

// // 定义待执行的sql语句

// const sqlstr = 'update  users set username=?, password=? where id=?';

// db.query(sqlstr, [user.username, user.password, user.id],  (err, results) => {
//     if(err) return console.log(err.message)

//     //sql更新操作执行成功
//     //注意： 执行了update操作之后，返回的results也是一个对象
//     if(results.affectedRows === 1) {
//         console.log('更新数据成功');
//     }
// })



//演示更新用户信息的便捷方式
// const user = { id: 11, username: 'aaaa', password: '000' };

// //定义待执行的sql语句

// const sqlstr = 'update  users set ? where id=?';

// db.query(sqlstr, [user, user.id],  (err, results) => {
//     if(err) return console.log(err.message)

//     //sql更新操作执行成功
//     //注意： 执行了update操作之后，返回的results也是一个对象
//     if(results.affectedRows === 1) {
//         console.log('更新数据成功');
//     }
// })



//演示直接删除数据哭数据操作

const sqlstr = 'delete from users where id=?';

db.query(sqlstr, 11, (err, results) => {
    if(err) return console.log(err)

    //执行删除的sql成功
    // 注意执行delete语句之后也会返回一个对象，也会包含一个affectedRows属性
    if(results.affectedRows === 1) {
        console.log('删除数据成功')
    }
})


//演示标记删除， 标记删除就是在表中设置类似于status这样的状态字段，来标记当前这条谁是否被删除

//当用户执行了删除的动作时，我们并没有执行DELETE语句把数据删除，而是执行了update语句，将这条数据对应的status字段标记为删除即可




