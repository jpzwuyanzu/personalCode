// 在自定义模块中可以通过module.exports对象，将模块内部的成员共享出去，供外界使用
// 外界用require()方法导入自定义模块时，的到的就是module.exports指向的对象

const  m  = require('./11.module.exports的使用');

console.log(m)