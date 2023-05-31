// 默认情况下module.exports 和exports 对象指向同一个对象，
//但是最终结果是以module.exports指向的对象

// 只要是使用require导入的模块，得到的永远是module.exports指向的对象

console.log(module.exports === exports); // true 