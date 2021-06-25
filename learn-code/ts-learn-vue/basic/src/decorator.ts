
// 1，装饰器， 分为有参装饰器，和无参装饰器（工厂写法）
function mtDecor (target: any): void {
    console.log('这是一个装饰器', target)
}


@mtDecor
class Animal5 {
    constructor(public name: string, public age: string) {
        this.name = name
        this.age = age
    }
}

//2，使用类的装饰器扩展类的属性和方法
// interface IClass {
//     new (...args: any[]): Object  //类型推断为Object，并且可以使用new关键字
// }

// function fn<T extends IClass>(Target: T) {
//  return class extends Target {
//     sex:number = 1
//     sayHello() {
//         console.log('hello ' + this.sex)
//     } 
//  }
// }

// @fn
// class  Person4 {
//     constructor(public name: string, public age: number) {
//         this.name = name
//         this.age = age
//     }

//     greeter () {
//         console.log('hello ' + this.name)
//     }
// }

// let per4: Person4 = new Person4('李', 18)
// console.log(per4)


// 使用装饰器修饰类的构造函数(构造函数的重载，方法的重载)

// interface IClass {
//     new (...args: any[]): Object
// }

// function fn<T extends IClass>(Target: T) {
//     return class extends Target {
//         name: string = '李世民'
//         sex: string = '男'

//         sayHello () {
//             console.log(this.name + '的性别为' + this.sex)
//         }
//     }
// }

// @fn
// class Person6 {
//     name: string
//     sex: string
//     constructor() {
//         this.name ="熊大"
//         this.sex = "公"
//     }

//     sayHello() {
//         console.log(this.name + '的性别为' + this.sex)
//     }
// }

// let per6:Person6 = new Person6()
// per6.sayHello()


//装饰器工厂的写法
function fn(params: string) {
    return function  fn(Target: any) {
        Target.prototype.weight = params
        console.log( Target.prototype) 
    }
}

//类的函数装饰器
function test (target: any, key:any, descriptor:any) {
    console.log('类的函数的装饰器', key) //装饰的函数名称
    console.log('类的函数的装饰器',descriptor) //被装饰的函数的对象属性
}

@fn('75kg')
class Person7 {

    @test
    sayHello(){
        console.log('hello world')
    }
}

let per7: any = new Person7()
// console.log(per7.weight)