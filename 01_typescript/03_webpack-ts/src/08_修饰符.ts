//修饰符: 类中成员的修饰符， 主要是描述成员（属性， 构造函数， 方法）的可访问性
// public类中成员都有自己默认的修饰符，就是public，代表是公共的，任何位置都可以访问类中的成员
// private 类中的成员如果使用private来修饰，那么外部是无法访问该属性， 子类中也是无法访问该成员数据
// protected 修饰了属性成员只能在自己以及子类中可以访问
// readonly 对类中的属性成员进行修饰，修饰之后该属性成员不能在外部被修改，只能在构造函数内部修改，即使是类本身普通方法也不能修改readonly修饰的属性

(() => {
    //定义一个类
    class Person {
        //属性
        name: string
        //构造函数
        constructor(name:string) {
            this.name = name
        }
        //方法
        eat() {
            console.log('吃一碗拉面' + this.name)
        }
    } 

    class Student extends Person {
        constructor(name: string) {
            super(name)
        }
        play() {
            console.log('我就喜欢玩娃娃')
        }
    }

    const per = new Person('大蛇丸')
    console.log(per.name)
    per.eat()
})()