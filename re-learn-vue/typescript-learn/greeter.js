function greeter(person) {
    return 'hello' + person.firstName + '' + person.lastName;
}
var user = { firstName: 'sam', lastName: 'user' };
greeter(user);
