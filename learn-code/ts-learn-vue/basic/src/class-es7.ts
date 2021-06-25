// es6

// class Animal2 {
//     constructor(public name: string) {
//         this.name = name
//         this.state = { list: [] }
//     }
// } 

// let ani2 = new Animal2('tom')


//es7  
interface IState {
    list: any[]
}
class Animal2 {

    //静态属性
    static msg = '这里是静态属性'

    //实例属性
    name: string ='lllll'
    state:IState = {
        list: [] 
    }

    constructor() {
        console.log(this.name)
    }
} 

let ani2 = new Animal2()
console.log(Animal2.msg)