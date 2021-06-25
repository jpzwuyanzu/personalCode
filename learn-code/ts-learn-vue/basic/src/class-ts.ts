
// typescript中的类
//typeScript 可以使用三种访问修饰符,分别是public/ private/ protected

// public 修饰的属性或方法是共有的，可以在任何地方被访问到，默认所有属性和方法都是public的

// private 修饰的属性和方法是私有的，不能在声明它的类外部被访问, 在子类中也不允许被访问

// protected 修饰的属性或者是方法是收保护的，和private是差不多，区别是它在子类中是允许被访问的

// class Animal3 {
//     public name: string
//     public constructor(name: string) {
//         this.name = name
//     }
// }

// let ani3 = new Animal3('jack')
// console.log(ani3.name) //jack
// ani3.name = 'Tom'
// console.log(ani3.name) //Tom


//当构造函数被private修饰，该类不能被实力化和继承
// class Animal3 {
//     private name: string
//     public constructor(name: string) {
//         this.name = name
//     }
// }

// let ani3 = new Animal3('jack')
// console.log(ani3.name) //属性是私有的，不能访问



class Animal3 {
    protected name: string // 注意private 与protected的区别
    public constructor(name: string) {
        this.name = name
    }
}

class Cat extends Animal3 {
    constructor(name: string) {
        super(name)
        console.log('cat name is '+ this.name) //如果是private就会报错,只能在子类中获取
    }
}

let cat = new Cat('Tom')

// 当构造函数被protected修饰的时候，只能被用于子类的继承



