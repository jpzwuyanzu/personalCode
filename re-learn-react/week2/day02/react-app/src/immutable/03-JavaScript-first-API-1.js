import { Map} from 'immutable'

const obj = Map({ a: 1, b: 2, c: 3, d: 4 })

const map1 = obj.map((value, key) => {
    return key.toUpperCase()
}).join('**')

console.log(map1) //A**B**C**D