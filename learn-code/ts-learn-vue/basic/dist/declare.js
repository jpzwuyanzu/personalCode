"use strict";
// 类型断言
var val = 'hello word';
// 当你在TypeScript里使用JSX时，只有 as语法断言是被允许的。-----react中使用的时候
//类型断言有两种形式。 其一是“尖括号”语法：
var strLen = val.length;
//另外一种是使用as
var strLen1 = val.length;
