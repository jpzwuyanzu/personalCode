import HomeStore from './home'
class Store {
    constructor() {
        //分模块
        // new 实例时传入this，--- 方便魔魁之间彼此调用，这里的this指的是总的模块
        this.home = new HomeStore(this)
    }
}

const store = new Store()

export default store