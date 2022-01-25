// 数组定义的两种方式

import { LGoods } from "./interface/index"

//1，在元素类型的后边加上[]
let list: number[] = [1,2,3,4]

//2,代表的是数组的泛型
let list1: Array<Number> = [2,3,4,5,6]

//定义数据
// data () { return { prolist: Array<LGoods> } }
// 这种方式也是可以使用
// let list2: LGoods[] = [{ id: 1, name: 'lixiaozi' }] 
let list2: Array<LGoods> = [{ id: 1, name: 'lixiaozi' }]

