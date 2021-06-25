// class Animal {
//     constructor(public name: string) {
//         this.name = name
//     }

//     sayHi () {
//         console.log(`my name is ${ this.name }`)
//     }
// }

// class Cat extends Animal {
//     constructor(name: string){
//         super(name) // 
//     }
//     sayHi () {
//         console.log(`hello, my name is ${this.name}`)
//         super.sayHi() //这里是调用父类方法
//     }
// }


// let animal = new Cat('Cat')

// animal.sayHi()



//子类继承父类的属性和方法
// class React {
//     constructor(public props: any) {
//         this.props = props
//     }

//     render () {
//         return this.props
//     }
// }

// class Com extends React {
//     constructor(props: any) {
//         super(props)
//     }
// }

// let com = new Com('aa')
// console.log(com.render())


//存取器
class Animal {
    constructor(public name: string) {
        this.name = name
    }

    // setter
    set uname (val: string) {
        this.name = val
        console.log('name is ' + val)
    }

    //getter
    get uname () {
        return this.name
    }
}

let ani = new Animal('Dog') // 直接赋值
console.log(ani.uname) //调用的getter
ani.uname = 'cat' //调用的setter
console.log(ani.uname) //调用的getter


//static修饰的静态属性是不会被实例话，只能通过类去调用，不能使用类的实例去调用





