import { Person } from "./interface/index"

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

class Student {
    fullname: string
    //在构造函数的参数上使用public等于创建了同名的成员变量
    constructor(public firstname: string, public lastname: string) {
        this.fullname =  this.firstname + '' + this.lastname
    }
}

function greeter1 (person: Person) {
    return 'hello, ' + person.firstname + '' + person.lastname
}

const stu = new Student('li', 'qusi')

console.log(greeter1(stu))