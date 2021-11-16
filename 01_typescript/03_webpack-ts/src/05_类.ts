// 类： 可以理解为模版，通过模版可以实力化对象，
// 面向对象的编程思想
(() => {
// ts 中类的定义使用
class Person {
    name: string
    age: number
    gender: string
    //定义构造函数，为了实力化对属性的值初始化
    constructor(name: string = '小花', age:number = 12, gender: string = '女') {
        // 更新对象中的属性数据
        this.name = name
        this.age = age
        this.gender = gender
    }
    // 定义实例方法
    sayHi(str: string) {
        console.log(`大家好--年龄${this.age}---名字${this.name}--性别${this.gender}` + str)
    }
}
const person = new Person()
person.sayHi('你叫什么')

})()