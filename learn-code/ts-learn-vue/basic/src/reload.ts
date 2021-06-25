
// 反转

//使用函数和联合类型
// function reverse (x: number | string) {
//     if(typeof x === 'number') {
//         return x.toString().split('').reverse().join('')
//     } else {
//         return x.split('').reverse().join('')
//     }
// }



//函数的重载
//这种方式当输入参数类型确定的时候，输出的类型也是确定
// typescript会从公前面的函数开始匹配
// 多个函数定义有包含关系， 需要有限把精确定义的函数放在最前面
function reverse (x: string): string
function reverse (x: number): number 
function reverse (x: number | string): number | string {
    if(typeof x === 'number') {
        return Number(x.toString().split('').reverse().join(''))
    } else {
        return x.split('').reverse().join('')
    }
}

console.log(reverse(123))
console.log(reverse('hello'))