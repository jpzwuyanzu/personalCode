"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ?代表可选参数
function greeter2(person, goods) {
    return "Hello, " + person.firstname + person.lastname;
}
var person2 = { firstname: 'xi', lastname: 'meng' };
console.log(greeter2(person2));
