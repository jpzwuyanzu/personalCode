
//类实现接口中的方法

interface IAlarm {
    alert():void
}

// interface ILight {
//     lighton(): void
//     lightoff(): void
// }

//接口可以继承接口
interface ILightableAlert extends IAlarm {
    lighton(): void
    lightoff(): void
}

class Door{}

//一个类只能继承一个类
class SecurityDoor extends Door implements IAlarm {
    alert() {
        console.log('防盗门报警')
    }
}


// class CarDoor implements IAlarm, ILight { //一个类可以实现多个接口，用逗号隔开
class CarDoor implements ILightableAlert { //也可以通过接口继承接口来简化
    alert() {
        console.log('车门报警')
    }   

    lighton() {
        console.log('开车灯')
    }
    lightoff() {
        console.log('关车灯')
    }
}