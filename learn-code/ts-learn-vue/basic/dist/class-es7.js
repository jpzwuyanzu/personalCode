"use strict";
// es6
var Animal2 = /** @class */ (function () {
    function Animal2() {
        //实例属性
        this.name = 'lllll';
        this.state = {
            list: []
        };
        console.log(this.name);
    }
    //静态属性
    Animal2.msg = '这里是静态属性';
    return Animal2;
}());
var ani2 = new Animal2();
console.log(Animal2.msg);
