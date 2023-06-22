import { defineStore } from 'pinia'
const useCusThemeStore = defineStore('custheme', {
    persist: true,
    state: () => {
        return {
            theme: 'light',
        }
    },
    actions: {
        switchTheme(key: string) {
            this.theme = key
        }
    }
})

export default useCusThemeStore