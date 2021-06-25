"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// ? 代表可选参数
function greeter2(person, goods) {
    return "hello, " + person.firstname + '' + person.lastname;
}
var person = { firstname: 'li', lastname: 'q' };
greeter2(person);
