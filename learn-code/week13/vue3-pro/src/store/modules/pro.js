import * as types from './../mutations-types'
import { getProlist } from './../../api/pro'
export default {
  namespaced: true,
  state: {
    prolist: []
  },
  actions: {
    async getProlistData (context, payload) {
      const res = await getProlist()
      context.commit(types.CHANGE_PRO_LIST, res.data)
    }
  },
  mutations: {
    [types.CHANGE_PRO_LIST] (state, payload) {
      state.prolist = payload
    }
  }
}
