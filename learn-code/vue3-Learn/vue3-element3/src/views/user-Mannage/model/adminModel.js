import { reactive } from 'vue'
import request  from './../../../utils/request'
export function adminList () {

    const state = reactive({
        list: [],
        loading: false
    })

    function getAdminList () {
        state.loading = true;
        return request('/adminList.json').then(res => {
            state.list = reactive(res.result)
        }).finally(() => {
            state.loading = false;
        })
    }

    getAdminList()

    return { state, getAdminList }
}