abstract class Animal4 {
    // name: string
    constructor(public name: string) {
        this.name = name
    }

    //抽象类中的函数不去实现， 在子类中必须实现同名的函数
    // 就像react中组件继承了React的组件Component，必须增加一个render函数一样
    abstract sayHi():void
}

// 抽象类不能被创建成实例，可以被子类继承


class Cat1 extends Animal4{
    constructor(name: string) {
        super(name)
    }

    sayHi() {
        console.log(`hi ${this.name}`)
    }
}

let cat1:Cat1 = new Cat1('cat')

cat1.sayHi()