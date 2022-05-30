interface IPerson {
    firstName: string;
    lastName: string;
}
function greeter(person: IPerson) {
    return 'hello' + person.firstName + '' + person.lastName
}

let user = { firstName: 'sam', lastName: 'user' }

greeter(user)
