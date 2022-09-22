// 类 + 接口
//接口是一种规范，可以被类来实现

interface IFunc {
    getName: () => string
    getAge: () => number
}

class A implements IFunc {
    a1(){}
    a2() {}
    getName() {
        return 'AAA'
    }
    getAge() {
        return 100
    }
}

class B implements IFunc {
    b1(){}
    b2() {}
    getName() {
        return 'BBB'
    }
    getAge() {
        return 100
    }
}

function init(obj: IFunc) {
    obj.getName()
    obj.getAge()
}

var objA = new A();
var objB = new B();
init(objA)
init(objB)
export default {}