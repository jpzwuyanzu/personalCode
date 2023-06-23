import { defineStore } from 'pinia'
const useUserStore = defineStore('userinfo', {
    persist: true,
    state: () => {
        return {
            userInfo: {},
            loginState: false
         }
    },
    actions: {
        saveUserInfo(params: any) {
            this.userInfo = {...params}
        },
        changeLoginStatus(status: boolean) {
            this.loginState = status
        }
    }
})

export default useUserStore