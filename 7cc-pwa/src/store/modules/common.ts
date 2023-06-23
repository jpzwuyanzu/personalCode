import { defineStore } from 'pinia'
const useCommonStore = defineStore('comon', {
    persist: true,
    state: () => {
        return {
           loginSheetState : true
         }
    },
    actions: {
        convertLoginSheet(state: boolean) {
            this.loginSheetState = state
        }
    }
})

export default useCommonStore