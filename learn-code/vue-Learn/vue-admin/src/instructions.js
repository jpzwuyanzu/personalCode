
import Vue from 'vue'

// 权限过滤指令  用法 v-autho='oms1000'
Vue.directive('autho', {
    inserted(el, data) {
        let jurisdnArrs = util.getStorage('local', 'all_user_autho_code_list') ? JSON.parse(util.getStorage('local', 'all_user_autho_code_list')) : []
        //权限过滤器
        if(!data.value) {$(el).remove(); return;}
        let result = jurisdnArrs.includes(data.value);
        if(!result){
            $(el).remove()
        }     
    },
}) 