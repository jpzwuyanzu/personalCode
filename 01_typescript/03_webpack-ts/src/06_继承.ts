// 继承: 类与类之间的关系 
// A继承B， 此时A叫子类， B叫做基类
// 子类也叫做派生类， 
// 基类  超类（父类）
(() => {

    // 定义一个类， 作为父类
    class Person {
        // 定义属性
        name: string
        age: number
        gender: string

        //定义构造函数
        constructor(name: string = 'xiaoming', age: number = 18, gender: string = 'nan') {
            // 更新
            this.name = name
            this.age = age
            this.gender = gender
        }

        //定义方法
        sayHi(str: string):void {
            console.log(`我是${this.name},${str}`)
        }
    }

    //定义一个子类
    class Student extends Person {
        constructor(name: string, age: number, gender: string){
            // 调用父类构造函数
            super(name, age, gender)
        }
        //可以调用父类的方法
        sayHi():void {
            console.log('我是学生类中调用父类方法')
            super.sayHi('haha')
        }
    }

    //实力person
    const person = new Person()
    const student = new Student('xiaotiantian', 19, '女')
    student.sayHi()

    //总结： 类和类之间如果要实现继承关系，用extends， 子类调用父类的构造函数用super，子类可以重写父类方法

})()