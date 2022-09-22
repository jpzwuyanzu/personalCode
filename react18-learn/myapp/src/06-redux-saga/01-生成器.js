// es6生成器 generator
/**
 * 函数前面带有星号，函数里边使用yield关键字 yield 代表产出
 */

function *test() {
    console.log("111111")
    var input1 = yield '1111输出';
    console.log("222222", input1)
    var input2 = yield '2222输出';
    console.log("333333", input2)
    var input3 = yield '3333输出';
    console.log("444444", input3)
}

var myTest = test()
var res1 = myTest.next() 
console.log(res1) //{value: '1111输出', done: false}
var res2 = myTest.next('aaaa')
console.log(res2) //{value: '2222输出', done: false}
var res3 = myTest.next('bbbb')
console.log(res3) //{value: '3333输出', done: false}
var res4 = myTest.next('cccc')
console.log(res4) //{value: undefined, done: true}