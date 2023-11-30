import { defineStore } from 'pinia'
const useCustabStore = defineStore('custab', {
    persist: true,
    state: () => {
        return {
            activeTab: 'home',
        }
    },
    actions: {
        switchTab(key: string) {
            this.activeTab = key
        }
    }
})

export default useCustabStore