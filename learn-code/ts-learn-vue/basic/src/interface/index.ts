//接口不需要写逗号，如果有值可以使用；
interface Person {
    firstname: string
    lastname: string
}
interface Good {
    proid: string
    proname: string
    price: string
}

interface LGood {
    id: number
    name: string
    price?: string 
}




export {
    Person ,
    Good,
    LGood
}