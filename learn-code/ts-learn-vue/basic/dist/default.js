"use strict";
var search;
search = function (val, subString) {
    return val.search(subString) !== -1;
};
//函数多个参数可以使用剩余参数语法 ...args 形式
function pusharr(arr) {
    var items = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        items[_i - 1] = arguments[_i];
    }
    items.forEach(function (item) {
        arr.push(item);
    });
}
var arr = [];
pusharr(arr, 1, 2, 3, 4);
