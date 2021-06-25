import { observable, action, makeObservable } from 'mobx'
import request from './../utils/request'

class Store {
    @observable bannerlist = []
    @observable prolist = []

    @action
    getBannerlist () {
        request.get('/pro.json').then(res => {
            this.bannerlist = res.data.result
            console.log(this.bannerlist)
        })
    }

    @action
    getProlist () {

    }
}

export default new Store()