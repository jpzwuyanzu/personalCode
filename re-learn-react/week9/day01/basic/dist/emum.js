"use strict";
// 枚举类型是对js标准数据类型的一个补充，
//像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字。
var Color;
(function (Color) {
    Color[Color["Red"] = 0] = "Red";
    Color[Color["Green"] = 1] = "Green";
    Color[Color["Blue"] = 2] = "Blue";
})(Color || (Color = {}));
var c = Color.Red; //默认返回的是下标 0
var d = Color.Green; //默认返回的是下标 1
var e = Color.Blue; //默认返回的是下标 2
console.log(c);
console.log(d);
console.log(e);
