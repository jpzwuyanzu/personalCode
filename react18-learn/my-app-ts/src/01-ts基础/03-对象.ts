
// 对象

//interface 

interface IObj {
    name: string
    age: number
    location?: string //打一个问号代表是可选参数，可有可无
    [propName: string]: any //这个可以容错，代表任意属性
}

var obj1: IObj = {
    name: 'tony',
    age: 100
}

console.log(obj1.name)



export default {}