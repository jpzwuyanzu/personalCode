"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// class Student {
//     fullname: string
//     firstname: string
//     lastname: string
//     constructor(firstname: string, lastname: string) {
//         this.firstname = firstname
//         this.lastname = lastname
//         this.fullname = firstname + lastname
//     }
// }
var Student = /** @class */ (function () {
    //在构造函数的参数上使用public等同于创建了同名的成员变量
    function Student(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
        this.fullname = this.firstname + this.lastname;
    }
    return Student;
}());
function greeter(person) {
    return 'hello' + person.firstname + ' ' + person.lastname;
}
var stu = new Student('li', 'ming');
console.log(greeter(stu));
