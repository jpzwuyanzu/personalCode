"use strict";
// typescript中的类
//typeScript 可以使用三种访问修饰符,分别是public/ private/ protected
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var Animal3 = /** @class */ (function () {
    function Animal3(name) {
        this.name = name;
    }
    return Animal3;
}());
var Cat = /** @class */ (function (_super) {
    __extends(Cat, _super);
    function Cat(name) {
        var _this = _super.call(this, name) || this;
        console.log('cat name is ' + _this.name); //如果是private就会报错,只能在子类中获取
        return _this;
    }
    return Cat;
}(Animal3));
var cat = new Cat('Tom');
// 当构造函数被protected修饰的时候，只能被用于子类的继承
