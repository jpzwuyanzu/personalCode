// ts中书写js中类

(() => {
 //定义一个接口
 interface IPerson {
     firstName: string //姓
     lastName: string  //名
 }

 //定义一个类
  class Person {
      // 定义公共字段（属性）
      firstName: string //姓
      lastName: string //名
      fullName: string //姓名
      // 定义一个构造器
      constructor(firstName: string, lastName: string) {
        //更新属性数据
        this.firstName = firstName
        this.lastName = lastName
        this.fullName = this.firstName + '_' + this.lastName
      }
  }

  //实例话对象
   const person =  new Person('诸葛', '孔明')

   function showFullName(person: IPerson) {
       return person.firstName + '__' + person.lastName
   }
   console.log(showFullName(person))
})()