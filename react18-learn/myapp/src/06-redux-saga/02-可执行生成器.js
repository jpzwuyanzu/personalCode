// es6生成器 generator
/**
 * 函数前面带有星号，函数里边使用yield关键字 yield 代表产出
 */

function getData1() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('data1')
        },1000)
    })
}
function getData2() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('data2')
        },1000)
    })
}
function getData3() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('data3')
        },1000)
    })
}

function *gen() {
    var f1 = yield getData1();
    console.log(f1);
    var f2 = yield getData2(f1);
    console.log(f2);
    var f3 = yield getData3(f2);
    console.log(f3);
}

function run(fn) {
    var g = fn()
    function next(data) {
        var result = g.next(data);
        if(result.done) {
            return result .value
        }
        result.value.then(res => {
            next(res)
        })
    }
    next()
}

run(gen)

