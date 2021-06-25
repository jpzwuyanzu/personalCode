//枚举是对js标准数据类型的补充，使用枚举类型可以为一组数值赋予友好的名字。

// enum Color { Red, Green, Blue }

// //默认的下标值从0开始
// let a: Color = Color.Red //默认返回的是下标 0 
// let b: Color = Color.Green //默认返回的是下标 1
// let c: Color = Color.Blue //默认返回的是下标 2




//也可以通过赋值改变下标
enum Color { Red = 10, Green, Blue }

//默认的下标值从0开始
let a: Color = Color.Red //默认返回的是下标 10 
let b: Color = Color.Green //默认返回的是下标 11
let c: Color = Color.Blue //默认返回的是下标 12


//枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 
//例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字：
//如果要获取key值
let aname: string = Color[10] // Red
let bname: string = Color[11] //Green
let cname: string = Color[12] //Blue