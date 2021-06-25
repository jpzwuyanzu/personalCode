import { observable, action, computed } from 'mobx'
import request from './../utils/request'
class HomeStore {

    constructor(store) {
        this.store = store // store代表总状态管理器
        this.getProlist = this.getProlist.bind(this) //this的指向
    }

    //初始化数据
    @observable prolist = []


    //计算属性
    @computed get prolen () {
        return this.prolist.length
    }

    //修改状态
    @action
    getProlist () {
        request('/pro.json').then(res => {
            console.log(res.data.result)
            this.prolist = res.data.result
        })
    }
}

export default HomeStore