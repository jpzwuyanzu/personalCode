import { defineStore } from "pinia";

const useCounterStore = defineStore('counter', {
    persist: true,
    state: () => {
        return { count: 13 }
    },
    actions: {
        increment() {
            this.count++
        }
    }
})

export default useCounterStore