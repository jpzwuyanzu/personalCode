import { Person, Good } from './interface/index'

// ? 代表可选参数

function greeter2 (person: Person, goods?: Good): string {
    return "hello, " + person.firstname + '' + person.lastname
}

let person: Person = { firstname:'li', lastname:'q' }

greeter2(person)