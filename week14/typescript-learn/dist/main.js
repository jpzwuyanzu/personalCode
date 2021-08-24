var hello = 'hello world';
console.log(hello);
//数组
var list1 = [1, 2, 3];
var list2 = [1, 2, 3];
var list3 = [1, 2, 3];
var list4 = [1, '2', 3];
var list5 = ['111', 2];
//tuple 元组 --固定长度固定类型的数组
var person1 = [1, 'axios'];
//联合类型 union
var union;
union = 2;
union = '2323';
// 字面量类型 literal
var union3;
union3 = 2;
var literal;
// 枚举类型 Enum
var Color;
(function (Color) {
    Color[Color["red"] = 5] = "red";
    Color[Color["green"] = 6] = "green";
    Color[Color["blue"] = 7] = "blue";
})(Color || (Color = {}));
var color = Color.blue;
console.log(color);
var Color2;
(function (Color2) {
    Color2[Color2["red"] = 5] = "red";
    Color2[Color2["green"] = 10] = "green";
    Color2[Color2["blue"] = 1] = "blue";
})(Color2 || (Color2 = {}));
var Color3;
(function (Color3) {
    Color3["red"] = "red";
    Color3["green"] = "green";
    Color3[Color3["blue"] = 1] = "blue";
})(Color3 || (Color3 = {}));
var color3 = Color3.green;
console.log(color3);
// any 和 unkonwn(需要做对应的类型判断才可以使用)
var randomValue = 6666;
randomValue = true;
randomValue = "2323";
randomValue = {};
// void(没有返回值)， undefined 与 never
function printResult() {
    console.log('lalala');
}
console.log(printResult()); //undefined
//never 代表函数永远无法执行完成
function throwError(msg, errorCode) {
    throw {
        msg: msg,
        errorCode: errorCode
    };
}
//  throwError('not found', 404)
// ts面向对象
var person4 = {
    firstName: 'axios',
    lastName: 'li',
    age: 18
};
console.log(person4.age);
var Point = /** @class */ (function () {
    //使用访问修饰符会自动完成属性的申明与赋值操作
    //私有变量默认用下划线开头
    function Point(_x, _y) {
        var _this = this;
        if (_y === void 0) { _y = 2; }
        this._x = _x;
        this._y = _y;
        this.drawPoint = function () {
            console.log("x:", _this._x, "y:", _this._y);
        };
        this.getDistances = function (p) {
            return Math.pow(p.X - _this._x, 2) + Math.pow(p.Y - _this._y, 2);
        };
        // this.x = x;
        // this.y = y;
    }
    Object.defineProperty(Point.prototype, "X", {
        get: function () {
            return this._x;
        },
        //使用getter， setter懒人包，默认属性名称大写，前面加上get set关键字，不能使用箭头函数
        set: function (value) {
            if (value < 0) {
                throw new Error('value不能小于0');
            }
            this._x = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Point.prototype, "Y", {
        get: function () {
            return this._y;
        },
        set: function (value) {
            if (value < 0) {
                throw new Error('value不能小于0');
            }
            this._y = value;
        },
        enumerable: false,
        configurable: true
    });
    return Point;
}());
// object class 实例instance
var point = new Point(24, 50);
// point.drawPoint()
//访问修饰符 public private protected
// point.x = 2;
console.log("x: ", point.X);
console.log("y: ", point.Y);
//typescript 泛型 类型加上箭头括号 Array<number>
var lastInArray = function (arr) {
    return arr[arr.length - 1];
};
var l1 = lastInArray([1, 2, 4, 5]);
var l2 = lastInArray(['a', 'b', 'c']);
var l3 = lastInArray(['a', 'b', 'c']);
//多泛型
var makeTuple = function (x, y) { return [x, y]; };
var v1 = makeTuple(1, "one");
var v2 = makeTuple(true, 1);
