//基础类型
(() => {
  // 布尔类型 boolean
  let flag: boolean = true;
  console.log(flag);

  // 数字类型 number
  let a1: number = 10; // 十进制
  let a2: number = 0b1010; // 二进制
  let a3: number = 0o12; // 八进制
  let a4: number = 0xa; // 十六进制
  console.log(a1)
  console.log(a2)
  console.log(a3)
  console.log(a4)

  //字符串类型 string
  let str1: string = '窗前明月光'
  let str2: string = '小明去开窗'
  let str3: string = '遇到一耳光'
  let str4: string = '牙齿掉光光'
  console.log(`${str1},${str2},${str3},${str4}`)

  //字符串和数字之间拼接
  let str5: string = '准备回家'
  let str6: number = 666
  console.log(`${str5}${str6}`)

  //ts变量一开始是什么类型，后期只能用该类型赋值，不能用其他类型赋值该变量

  console.log('===========')
  let und:undefined = undefined
  let nll: null = null
  console.log(und)
  console.log(nll)
  
  console.log('++++++++++++++')
  // undefined 和null 都可以作为其他类型的子类型，在非严格模式下可以把undefined和null赋值给其他类型 如number类型

  let num2:undefined = undefined
  console.log(num2)

  console.log('===========')
  //数组类型
  //数组定义方式1 let 变量名:类型[] = [值1，值2]
  let arr1:number[] = [10,11,12,13,14]
  //数组定义方式2 泛型写法 let 变量名:Array<类型> = [值1，值2]
  let arr2:Array<number> = [1,2,3,4,5]

  console.log('arr1:',arr1)
  console.log('arr2:',arr2)

  console.log('===========')

  //元组类型 ： 在定义数组的时候，数据类型的位置和个数应该跟定义元组的时候一一对应
  let arr3:[string, number, boolean] = ['字符串', 100.09077, true]

  console.log(arr3[0].split(''))
  console.log(arr3[1].toFixed(2))

  console.log('===========')
  //枚举类型 枚举里边每个数据值可以叫做元素，每个元素都有自己的编号，从0开始，依次递增
  enum Color {
      red =1,
      green,
      blue
  }
  //定义一个Color类型枚举变量来接收枚举的值
  let color:Color = Color.red
   console.log(color)
   console.log(Color.red, Color.green, Color.blue)
   console.log(Color[3]) //可以通过枚举的值获取到对应的变量名称
  enum Gender {
      girle,
      man
  }
  console.log(Gender.girle)

  console.log('===========')

  //any类型
  let str:any = 100
  str = '年少不知富婆好，错把少女当成宝'
  console.log(str)

  // 当一个数组中要存储多个数据，个数不确定，类型不确定
  let arr: any[] = [100, '年少不知软饭香，错把青春到插秧']
  console.log(arr)

  //void 代表函数没有返回值
  function showMsg():void {
      console.log('只要富婆把握住，连夜搬进大别墅')
  }
  console.log(showMsg()) //undefined

  //object 类型
  // 定义一个函数，参数是object
  function getObj(obj: object):object {
    console.log(obj)
    return {
        name: '漩涡鸣人',
        age:18
    }
  }
  console.log(getObj({name: '佐助', age: 17}))

  //联合类型
  //需求1: 定义一个一个函数得到一个数字或字符串值的字符串形式值
//   function getString(str: string|number):string{
//       return str.toString()
//   }
//   console.log(getString(123))

  //需求2: 定义一个一个函数得到一个数字或字符串值的长度
  // 类型断言， 告诉编译器我知道自己在干什么，
  //类型断言有两种形式。 其一是“尖括号”语法, 另一个为 as 语法
  // <类型>变量名
  // 变量名 as 类型
  function getString(str: string|number):number{
      if((<string>str).length) {
        //string
        return (str as string).length
      } else {
        //number
        return str.toString().length
      }
    
}
console.log(getString('123'))


// 类型推断
let txt = 100
console.log(txt)

})();
