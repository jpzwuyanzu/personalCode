import { makeAutoObservable} from 'mobx'
import request from './../utils/request'
class Store {
    prolist = []
    constructor() {
        makeAutoObservable(this)
    }

    getProlist () {
        request.get('/pro.json').then(res => {
            console.log(res.data.result)
            this.prolist = res.data.result
        })
    }
}

const store = new Store()

export default store