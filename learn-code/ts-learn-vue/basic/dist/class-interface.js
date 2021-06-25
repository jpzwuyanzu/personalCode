"use strict";
//类实现接口中的方法
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
var Door = /** @class */ (function () {
    function Door() {
    }
    return Door;
}());
//一个类只能继承一个类
var SecurityDoor = /** @class */ (function (_super) {
    __extends(SecurityDoor, _super);
    function SecurityDoor() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SecurityDoor.prototype.alert = function () {
        console.log('防盗门报警');
    };
    return SecurityDoor;
}(Door));
// class CarDoor implements IAlarm, ILight { //一个类可以实现多个接口，用逗号隔开
var CarDoor = /** @class */ (function () {
    function CarDoor() {
    }
    CarDoor.prototype.alert = function () {
        console.log('车门报警');
    };
    CarDoor.prototype.lighton = function () {
        console.log('开车灯');
    };
    CarDoor.prototype.lightoff = function () {
        console.log('关车灯');
    };
    return CarDoor;
}());
