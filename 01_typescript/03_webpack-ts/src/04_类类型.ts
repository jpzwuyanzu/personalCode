
// 类类型： 类的类型可以通过接口来实现
(() => {
 //定义一个接口
 interface IFly {
     // 该方法没有任何的实现
    fly():void
 }

 //定义一个类，类的类型就是上面的接口(实际上可以理解为是接口约束了类)
 class Person implements IFly {
     //实现接口中方法
    fly():void {
        console.log('i can fly')
    }
 }

 //实力化对象
 const person = new Person()
 person.fly()


 // 定义一个接口
 interface ISwim {
     swim():void
 }

 // 定义一个类，类的类型就是IFly和ISwim， 当前类实现多个接口,一个类可以同时被多个接口约束
  class Person2 implements IFly, ISwim {
    fly():void {
        console.log('i can fly2')
    }
    swim():void {
        console.log('i can swim2')
    }
  }

  const person2 = new Person2()
  person2.fly()
  person2.swim()

  //总结： 类可以通过接口的方式来定义当前类的类型，类可以实现一个接口，也可以实现多个接口

  // 接口可以继承其他的多个接口
  // 定义一个接口继承其他接口
  interface IMyFlyAndSwim extends IFly, ISwim {

  }

  // 定义一个类
  class Person3 implements IMyFlyAndSwim {
    fly():void {
        console.log('i can fly3')
    }
    swim():void {
        console.log('i can swim3')
    }
  }

  const person3 = new Person3()
  person3.fly()
  person3.swim()

   // 总结： 接口可以继承接口（extends）， 类可以实现接口（implements）

})()