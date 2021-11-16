//多态: 父类型的引用指向子类型的对象，不同类型的对象对相同的方法产生不同的行为
(() => {
    //定义一个父类
    class Animal {
        name: string
        constructor(name: string) {
            this.name = name
        }
        run(distance: number = 0) {
            console.log(`${this.name}跑了${distance}米`)
        }
    }
    //定义一个子类
    class Dog extends Animal {
        constructor(name: string) {
            //调用父类构造函数，实现子类中属性初始化操作
            super(name)
        }
        //实例方法，重写父类
        run(distance: number = 5) {
            console.log(`${this.name}跑了${distance}米`)
        }
    }

    // 定义子类
    class Pig extends Animal {
        constructor(name: string) {
            //调用父类构造函数，实现子类中属性初始化操作
            super(name)
        }
        //实例方法，重写父类
        run(distance: number = 10) {
            console.log(`${this.name}跑了${distance}米`)
        }
    }

    const ani:Animal = new Animal('动物')
    ani.run()
    const dog:Dog = new Dog('大黄')
    dog.run()
    const pig:Pig = new Pig('猪猪侠')
    pig.run()

    console.log('================')
    // 父类和子类的关系，父子关系, 用父类的类型创建子类的对象
    const dog1: Animal = new Dog('小黄')
    dog1.run()
    const pig1:Animal = new Pig('小猪')
    pig1.run()

    console.log('=============')
    //该函数需要的参数是Animal类型
    function showRun(ani:Animal) {
        ani.run()
    }
    showRun(dog1)
    showRun(pig1)
})()
