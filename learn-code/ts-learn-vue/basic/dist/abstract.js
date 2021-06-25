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
var Animal4 = /** @class */ (function () {
    // name: string
    function Animal4(name) {
        this.name = name;
        this.name = name;
    }
    return Animal4;
}());
// 抽象类不能被创建成实例，可以被子类继承
var Cat1 = /** @class */ (function (_super) {
    __extends(Cat1, _super);
    function Cat1(name) {
        return _super.call(this, name) || this;
    }
    Cat1.prototype.sayHi = function () {
        console.log("hi " + this.name);
    };
    return Cat1;
}(Animal4));
var cat1 = new Cat1('cat');
cat1.sayHi();
