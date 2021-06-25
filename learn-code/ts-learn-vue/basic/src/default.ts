
interface Obj {
    a: number,
    b?: number
}

// function test (obj: {a: number, b ? :number}): void {
//     let  {a, b = 100 } = obj
//     console.log(a + b)
// }


// function test (obj: Obj): void {
//     let  {a, b = 100 } = obj
//     console.log(a + b)
// }


//添加了默认值的参数会被识别为可选参数
//函数声明式
// function test ({a, b = 200}: Obj): void {  //参数的解构赋值
//     console.log(a + b)
// }

//函数表达式
// const test = function({a, b = 200}: Obj): void {  //参数的解构赋值
//         console.log(a + b)
//     }

// test({a: 10})


// let search

// search = function (val: string, subString: string): boolean {
//     return val.search(subString) !== -1
// }

//下面是用接口定义函数的形式
interface searchInterface {
    (val: string, subString: string): boolean
}

let search: searchInterface

search = function (val: string, subString: string) {
    return val.search(subString) !== -1
}



//函数多个参数可以使用剩余参数语法 ...args 形式
function pusharr (arr: number[], ...items : any[]) {
    items.forEach((item: number) => {
        arr.push(item)
    })
}

let arr: number[] = []
pusharr(arr , 1,2,3,4)

