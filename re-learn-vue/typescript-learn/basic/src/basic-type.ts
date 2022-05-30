//布尔值
let isDone: boolean = false;

//数字
let tempInt: number = 5

//字符串
let tempName: string = 'bob';

//数组：TypeScript像JavaScript一样可以操作数组元素。 有两种方式可以定义数组。 第一种，可以在元素类型后面接上 []，表示由此类型元素组成的一个数组：
//1，元素类型[]-- number[]
let tempList: number[] = [1,2,3,4,5];
//2， Array<元素类型> Array<number>
let tempList2: Array<number> = [1,2,3,4,5];

//元组：元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同。 比如，你可以定义一对值分别为 string和number类型的元组。
let tempX: [string, number];
tempX = ['hello', 12];
//当访问一个已知索引的元素，会得到正确的类型：
console.log(tempX[1]);
//当访问一个越界的元素，会使用联合类型替代
// tempX[2] = 'test'

//枚举enum 类型是对JavaScript标准数据类型的一个补充。 像C#等其它语言一样，使用枚举类型可以为一组数值赋予友好的名字

//默认情况下，从0开始为元素编号。 你也可以手动的指定成员的数值。 例如，我们将上面的例子改成从 1开始编号：
enum tempColor { Red = 1, Green, Blue }
let c: tempColor = tempColor.Green;
console.log(c);

//枚举类型提供的一个便利是你可以由枚举的值得到它的名字。 
//例如，我们知道数值为2，但是不确定它映射到Color里的哪个名字，我们可以查找相应的名字：
let colorName: string = tempColor[2];
console.log(colorName);

//练习枚举
enum tempEnum { white, black, orange }

let enumName: string = tempEnum[1];
console.log(enumName);

//void， 代表函数没有返回值， 如果用void申明变量，只能赋值null, undefined
function testUser (): void {
    console.log('test:' + '没有返回值');
}

//类型断言
//类型断言有两种形式。 
//其一是“尖括号”语法：
let someValue: any = 'this is a testing';
let strLength: number = (<string>someValue).length;
console.log('strLength', strLength)
//另外一种是as语法
let strLength2: number = (someValue as string).length;
console.log('strLength2', strLength2)
//两种形式是等价的。 至于使用哪个大多数情况下是凭个人喜好；然而，当你在TypeScript里使用JSX时，只有 as语法断言是被允许的


