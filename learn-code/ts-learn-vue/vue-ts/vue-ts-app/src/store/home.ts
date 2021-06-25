import { AxiosResponse } from 'axios'
import { IHomeState } from './../utils/types'
export default {
  namespaced: true,
  state: {
    bannerlist: [1, 2, 4],
    prolist: []
  },
  mutations: {
    changeBannerlist (state: IHomeState, payload: any) {
      state.bannerlist = payload
    },
    changeProlist (state: IHomeState, payload: any) {
      state.prolist = payload
    }
  },
  actions: {
    getBannerlistAction (context: any) {
      window.axios({
        url: '/banner'
      }).then((res: AxiosResponse<any>): void => {
        context.commit('changeBannerlist', res.data.data)
      })
    },
    getProlistAction (context: any, payload: any) {
      console.log(payload)
      window.axios({
        url: '/pro/list',
        params: payload, // get  params    ====   post data
        method: 'GET'
      }).then((res: AxiosResponse<any>): void => {
        context.commit('changeProlist', res.data.data)
      })
    }
  }
}