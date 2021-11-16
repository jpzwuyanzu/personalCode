//通过接口的方式来作为函数的类型使用
(() => {
   //定义一个接口，
   interface ISearchFunc {
       //定义一个调用签名
       (source: string, subString:string): boolean
   }

   //定义一个函数，该函数的类型就是上面接口
   const searchString: ISearchFunc = function (source: string, subString:string): boolean {
       // 在source字符串中查找subString字符串
       return source.search(subString) > -1
   }

   //调用函数
   console.log(searchString('小伙子，你可以', '小'))
    
})();
    