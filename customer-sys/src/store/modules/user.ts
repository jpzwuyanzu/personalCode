import { defineStore } from 'pinia'

const useUserStore = defineStore('user', {
    persist: true,
    state: () => {
        return {
        name: 'zs',
        age: 100,
        }
    },
})

export default useUserStore