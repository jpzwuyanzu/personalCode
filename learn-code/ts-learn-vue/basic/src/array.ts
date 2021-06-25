//数组定义的两种形式

import { LGood } from "./interface/index"

//在元素类型后边加上[]
let list: number[] = [1,2,3,4,5,6]

//数组的泛型
let list1: Array<number> = [1,2,3]

// 利用数组的泛型和接口来定义数据
//下边两种方式都可以使用
let list2: Array<LGood> = [{id: 1, name:'434'}]

let list3: LGood[] = [{id: 1, name:'434'}]

