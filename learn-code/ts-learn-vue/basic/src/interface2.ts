interface IPerson {
   readonly id: string  //代表只读属性，只能在创建的时候被赋值
    name: string
    age?: number
    // sex?: string
    // 下边的方式是定义任意属性，
    //但是已有的确定属性和可选属性的类型必须是任意属性类型的子集， 所以用any是最方便的
    [propName: string]: any
}

let per: IPerson = {
    id: 'user_2',
    name: 'ximeng',
    age: 35,
    sex: '女'
}

// per.id="1212" // 只读属性不能赋值