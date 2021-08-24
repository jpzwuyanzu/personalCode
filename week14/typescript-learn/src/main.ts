let hello = 'hello world'

console.log(hello)

//数组
let list1: number[] = [1,2,3]
let list2: Array<number> = [1,2,3]
let list3 = [1,2,3]

let list4 = [1,'2',3]
let list5: any = ['111', 2]

//tuple 元组 --固定长度固定类型的数组
let person1: [number, string] = [1, 'axios']


//联合类型 union
let union: string | number;

 union = 2
 union = '2323'

 // 字面量类型 literal
 let union3: 0 | 1 | 2
 union3 = 2

 let literal: 1 | 2 | true | [1,2,3,4]


 // 枚举类型 Enum
 enum Color {
    red = 5,
    green,
    blue
 }
 let color = Color.blue
 console.log(color)

 enum Color2 {
    red = 5,
    green = 10,
    blue = 1
 }

 enum Color3 {
    red = "red",
    green = "green",
    blue = 1
 }
 let color3 = Color3.green
 console.log(color3)


 // any 和 unkonwn(需要做对应的类型判断才可以使用)
 let randomValue: any = 6666;
  randomValue = true;
  randomValue = "2323";
  randomValue = {};


// void(没有返回值)， undefined 与 never
 function printResult(): void {
    console.log('lalala')
 }

 console.log(printResult()) //undefined

 //never 代表函数永远无法执行完成
 function throwError(msg: string, errorCode: number): never {
     throw {
         msg,
         errorCode
     }
 }

//  throwError('not found', 404)


 // ts面向对象
const person4 = {
    firstName: 'axios',
    lastName: 'li',
    age: 18
}
console.log(person4.age)

// interface 与class
// let drawPoint = (point: IPoint) => {
//     console.log({x: point.x, y: point.y})
// }
// drawPoint({ x: 107, y: 24 })
// let getDistances = (a: IPoint, b: IPoint) => {}

interface IPoint {
    drawPoint: () => void;
    getDistances: (p: IPoint) => number;
    X: number;
    Y: number;
}

class Point implements IPoint {
    //使用访问修饰符会自动完成属性的申明与赋值操作
    //私有变量默认用下划线开头
    constructor(private _x: number, public _y: number = 2) {
        // this.x = x;
        // this.y = y;
    }
    drawPoint = () => {
        console.log("x:", this._x, "y:", this._y);
    }
    getDistances = (p: IPoint) => {
        return Math.pow(p.X-this._x, 2) + Math.pow(p.Y-this._y, 2)
    }
    //使用getter， setter懒人包，默认属性名称大写，前面加上get set关键字，不能使用箭头函数
    set X(value: number){
        if(value < 0) {
            throw new Error ('value不能小于0')
        }
        this._x = value
    }

    get X(){
        return this._x
    }
    set Y(value: number){
        if(value < 0) {
            throw new Error ('value不能小于0')
        }
        this._y = value
    }

    get Y(){
        return this._y
    }
}

// object class 实例instance
const point = new Point(24, 50)
// point.drawPoint()
//访问修饰符 public private protected
// point.x = 2;
console.log("x: ",point.X)
console.log("y: ",point.Y)


//typescript 泛型 类型加上箭头括号 Array<number>

let lastInArray = <T>(arr: Array<T>) => {
    return arr[arr.length - 1]
}

const l1 = lastInArray([1,2,4,5])
const l2 = lastInArray(['a', 'b', 'c'])
const l3 = lastInArray<string | number>(['a', 'b', 'c'])

//多泛型
let makeTuple = <T, Y>(x: T, y: Y) => [x, y]
 const v1 = makeTuple(1, "one")
 const v2 = makeTuple(true, 1)





