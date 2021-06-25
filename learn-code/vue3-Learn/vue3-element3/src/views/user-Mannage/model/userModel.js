import { reactive } from 'vue'
import request from './../../../utils/request'

export  function userList(){
    //用户列表数据
    const state = reactive({
     loading: false,
     list: []
    })

    function getList () {
        state.loading = true;
        return request('/userList.json').then(res => {
            state.list = reactive(res.result)
        }).finally(() => {
            state.loading = false;
        })
    }
    //首次获取
    getList() 

    return { state, getList }
}
