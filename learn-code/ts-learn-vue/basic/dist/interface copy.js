"use strict";
function greeter2(person) {
    return "hello, " + person.firstname + '' + person.lastname;
}
var person = { firstname: 'li', lastname: 'q' };
greeter2(person);
