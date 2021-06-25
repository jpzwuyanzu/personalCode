"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
// 1，装饰器， 分为有参装饰器，和无参装饰器（工厂写法）
function mtDecor(target) {
    console.log('这是一个装饰器', target);
}
var Animal5 = /** @class */ (function () {
    function Animal5(name, age) {
        this.name = name;
        this.age = age;
        this.name = name;
        this.age = age;
    }
    Animal5 = __decorate([
        mtDecor
    ], Animal5);
    return Animal5;
}());
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
function fn(params) {
    return function fn(Target) {
        Target.prototype.weight = params;
        console.log(Target.prototype);
    };
}
//类的函数装饰器
function test(target, key, descriptor) {
    console.log('类的函数的装饰器', key); //装饰的函数名称
    console.log('类的函数的装饰器', descriptor); //被装饰的函数的对象属性
}
var Person7 = /** @class */ (function () {
    function Person7() {
    }
    Person7.prototype.sayHello = function () {
        console.log('hello world');
    };
    __decorate([
        test
    ], Person7.prototype, "sayHello", null);
    Person7 = __decorate([
        fn('75kg')
    ], Person7);
    return Person7;
}());
var per7 = new Person7();
// console.log(per7.weight)
