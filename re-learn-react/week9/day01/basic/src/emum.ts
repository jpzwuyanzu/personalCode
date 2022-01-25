// 枚举类型是对js标准数据类型的一个补充，
//像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。

enum Color{ Red, Green, Blue }
let c: Color = Color.Red //默认返回的是下标 0
let d: Color = Color.Green //默认返回的是下标 1
let e: Color = Color.Blue //默认返回的是下标 2
console.log(c)
console.log(d)
console.log(e)
