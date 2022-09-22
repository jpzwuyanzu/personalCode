// 函数

function test1(a: string,b: string, c?:number): string {
    console.log(a.substring(0, 1)+b.substring(0,1));
    return a.substring(0, 1)+b.substring(0,1)
}

var myname: string = test1('aaaa', 'bbbb', 100)


// ----------

interface iFunc{
    (a:string,b:string,c?:number): string
}

var myfunc2: iFunc = function test1(a: string,b: string, c?:number): string {
    console.log(a.substring(0, 1)+b.substring(0,1));
    return a.substring(0, 1)+b.substring(0,1)
}


interface IObj{
    name: string
    age: number
    getName:(name: string) => string
}

var obj:IObj = {
    name: '1000',
    age: 100,
    getName: (name: string) => {
        return name
    }
}

obj.getName('test')


export default {}