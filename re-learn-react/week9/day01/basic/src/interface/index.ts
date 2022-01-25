interface IPerson2 {
    firstname: string
    lastname: string
}

interface IGoods {
    proid: string
    proimg: string
    price: number
}

interface LGoods {
    id: number
    name: string
    price?: number
}

export {
    IGoods,
    IPerson2,
    LGoods
}