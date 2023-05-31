// 在一个自定义模块中，默认module.exports是空对象 module.exports = {}

const age = 20;


//向module.exports对象上挂在属性
module.exports.username = '章三'; 

module.exports.sayHello = function () {
    console.log('hello')
}

module.exports.age = age;