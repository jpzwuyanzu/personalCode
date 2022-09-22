//数组
//数组的第一种写法 :string[]

var list: string[] = ['1','2','3'];

for(var i in list) {
    list[i].substring(0,1)
}

var list2: number[] = [1,2,3,4,5];
list2.push(5)

var list3: (number | string)[] = [1,2,3,4,'5']
list3.push(33)

// -------------- 数组的泛型写法
var mylist1:Array<string> = ['aaaa','bbbb','cccc'];

var mylist2: Array<string | number> = ['121',3333]

mylist2.push(3)

export default {}