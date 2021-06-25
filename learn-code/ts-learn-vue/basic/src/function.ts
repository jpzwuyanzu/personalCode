
// let mysum: (x: number, y: number) => number

//ts中的 => 表示返回值的类型
//ts中剪头函数的写法
// mysum = function(x: number, y: number): number {
//     return x + y
// }


// let mysum: (x: number, y: number) => number = function(x: number, y: number): number {
//     return x + y
// }


// let mysum: (x: number, y: number) => number = (x: number, y: number): number  => (x+y)


// 使用接口来定义函数的形状
interface ISumInterface {
    (x: number, y: number): number
}

let mysum: ISumInterface = (x:number, y:number) => x+y

console.log(mysum(1,2))