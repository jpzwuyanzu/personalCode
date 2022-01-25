"use strict";
// 数组定义的两种方式
Object.defineProperty(exports, "__esModule", { value: true });
//1，在元素类型的后边加上[]
var list = [1, 2, 3, 4];
//2,代表的是数组的泛型
var list1 = [2, 3, 4, 5, 6];
//定义数据
// data () { return { prolist: Array<LGoods> } }
// 这种方式也是可以使用
// let list2: LGoods[] = [{ id: 1, name: 'lixiaozi' }] 
var list2 = [{ id: 1, name: 'lixiaozi' }];
