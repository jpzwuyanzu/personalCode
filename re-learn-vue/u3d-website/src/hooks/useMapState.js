import { computed } from 'vue'
import { mapState, useStore } from 'vuex'

export const useMapState = (getKeys) => {
    const store = useStore()
    const storeState = {};
    const storeFn = mapState(getKeys)
    console.log(storeFn)
    Object.keys(storeFn).forEach((fnKeys) => {
        const fn = storeFn[fnKeys].bind({$store: store})
        console.log(fn)
        storeState[fnKeys] = computed(fn)
    })
    console.log(storeState)
    return storeState
}