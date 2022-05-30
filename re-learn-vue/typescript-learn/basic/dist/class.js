"use strict";
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
exports.__esModule = true;
// 类的继承
// class Animal {
//     move (distanceInMeters: number = 0) {
//         console.log(`Animal moved ${distanceInMeters} m.`);
//     }
// }
// class Dog extends Animal {
//     bark () {
//         console.log('woof ! woof !');
//     }
// }
// const dog = new Dog();
// dog.bark();
// dog.move(10);
// dog.bark();
//在派生类中继承父类属性，使用this之前一定要调用super()
//在子类中重写了父类的move方法
var Animal = /** @class */ (function () {
    function Animal(theName) {
        this.name = theName;
    }
    Animal.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 0; }
        console.log("Animal moved " + distanceInMeters + " m.");
    };
    return Animal;
}());
var Snake = /** @class */ (function (_super) {
    __extends(Snake, _super);
    function Snake(name) {
        return _super.call(this, name) || this;
    }
    Snake.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 5; }
        console.log('Slithering.....');
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Snake;
}(Animal));
var Horse = /** @class */ (function (_super) {
    __extends(Horse, _super);
    function Horse(name) {
        return _super.call(this, name) || this;
    }
    ;
    Horse.prototype.move = function (distanceInMeters) {
        if (distanceInMeters === void 0) { distanceInMeters = 45; }
        console.log('Galloping....');
        _super.prototype.move.call(this, distanceInMeters);
    };
    return Horse;
}(Animal));
var sam = new Snake('Sammy the Python');
var tom = new Horse('Tommy the Palomino');
sam.move();
tom.move();
//公有，私有，受保护的修饰符
//在typescript中成员默认是public修饰的
//private 修饰的属性在类的外部是无法访问的
//protected修饰的属性可以在派生类的内部访问，不可以在外部访问
//存取器
var passcode = 'secret passcode';
var Employee = /** @class */ (function () {
    function Employee() {
    }
    Object.defineProperty(Employee.prototype, "fullName", {
        get: function () {
            return this._fullName;
        },
        set: function (newName) {
            if (passcode && passcode === 'secret passcode') {
                this._fullName = newName;
            }
            else {
                console.log('Error: Unauthorized update of employee!');
            }
        },
        enumerable: false,
        configurable: true
    });
    return Employee;
}());
var employee = new Employee();
employee.fullName = 'Bob Smith';
if (employee.fullName) {
    console.log(employee.fullName);
}
//把类当作接口使用
var Point = /** @class */ (function () {
    function Point() {
    }
    return Point;
}());
var point3d = { x: 1, y: 2, z: 3 };
