"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// class Student {
//     fullname: string
//     firstname: string
//     lastname: string
//     constructor(firstname: string, lastname: string) {
//         this.firstname = firstname
//         this.lastname = lastname
//         this.fullname =  this.firstname + '' + this.lastname
//     }
// }
var Student = /** @class */ (function () {
    //在构造函数的参数上使用public等于创建了同名的成员变量
    function Student(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.fullname = this.firstname + '' + this.lastname;
    }
    return Student;
}());
function greeter1(person) {
    return 'hello, ' + person.firstname + '' + person.lastname;
}
var stu = new Student('li', 'qusi');
console.log(greeter1(stu));
