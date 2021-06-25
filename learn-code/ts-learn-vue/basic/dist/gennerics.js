"use strict";
// function createArray(lenth: number, value: any): Array<any> {
//     let result = []
//     for(let i = 0; i< lenth; i++) {
//         result[i] = value
//     }
//     return result
// }
// createArray(3,'x') // ['x', 'x' , 'x']
// 函数名称的后边添加了<T>
//其中 T 用来指代任意输入的类型，在后面的输入 value: T 和输出 Array<T>中就可以使用了
function createArray(lenth, value) {
    var result = [];
    for (var i = 0; i < lenth; i++) {
        result[i] = value;
    }
    return result;
}
console.log(createArray(3, 'x')); // ['x', 'x' , 'x']
// 多个类型参数
function swap(tuple) {
    return [tuple[1], tuple[0]];
}
console.log(swap([1, '2'])); //[ '2', 1 ]
//泛型约束
//在函数的内部使用泛型的属性和方法，由于不知道具体类型，所以需要加上泛型的约束
//类型一
// interface Ilen {
//     length : number
// }
// function loggingIdentity<T extends Ilen>(arg: T): T {
//     console.log(arg.length)
//     return arg
// }
//类型2
// function loggingIdentity<T>(arg: Array<T>): Array<T> {
//     console.log(arg.length)
//     return arg
// }
//类型3
function loggingIdentity(arg) {
    console.log(arg.length);
    return arg;
}
