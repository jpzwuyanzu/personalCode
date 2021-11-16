//接口: 接口是对象状态和行为的描述，是一种类型，是一种约束
(() => {
//   id是number类型, 必须有, 只读的;
//   name是string类型, 必须有;
//   age是number类型, 必须有;
//   sex是string类型, 可以没有;

// 定义一个接口，该接口作为person对象的类型，限定或者约束该对象的数据
interface IPerson {
   readonly id: number //id是只读属性，number类型
    name: string
    age: number
    sex?: string //可选属性，可以没有
}

// 定义一个对象，该对象的类型就是接口
const person: IPerson = {
    id:1,
    name: '卡卡西',
    age: 18,
    sex: '女'
}
console.log(person)

})();
