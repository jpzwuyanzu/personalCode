import {IPerson2, IGoods } from './interface/index'


// ?代表可选参数
function greeter2(person: IPerson2, goods?: IGoods): string {
    return "Hello, " + person.firstname + person.lastname
}

let person2: IPerson2 = { firstname: 'xi', lastname: 'meng' }

console.log(greeter2(person2))