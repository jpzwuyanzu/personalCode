import { extend } from 'umi-request';
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
class Animal {
    name: string;
    constructor(theName: string) { this.name = theName }
    move (distanceInMeters: number = 0) {
        console.log(`Animal moved ${distanceInMeters} m.`);
    }
}

class Snake extends Animal {
    constructor(name: string) { super (name) }
    move(distanceInMeters = 5) {
        console.log('Slithering.....')
        super.move(distanceInMeters)
    }
}

class Horse extends Animal {
    constructor(name: string) { super(name) };
    move(distanceInMeters = 45) {
        console.log('Galloping....')
        super.move(distanceInMeters)
    }
}

let sam = new Snake('Sammy the Python');
let tom:Animal = new Horse('Tommy the Palomino');

sam.move();
tom.move();

//公有，私有，受保护的修饰符
//在typescript中成员默认是public修饰的


//private 修饰的属性在类的外部是无法访问的

//protected修饰的属性可以在派生类的内部访问，不可以在外部访问



//存取器

let passcode = 'secret passcode';

class Employee {
    private _fullName!: string;
    get fullName (): string {
        return this._fullName;
    }
    set fullName(newName: string) {
        if(passcode && passcode === 'secret passcode') {
            this._fullName = newName
        } else {
            console.log('Error: Unauthorized update of employee!')
        }
    }
}

let employee = new Employee()
employee.fullName = 'Bob Smith';
if(employee.fullName) {
    console.log(employee.fullName)
}

//把类当作接口使用

 class Point {
     x!: number;
     y!: number;
 }

 interface IPoint3d extends Point {
     z: number;
 }

 let point3d: IPoint3d = { x: 1, y: 2, z: 3 };