import { computed } from 'vue'
import { mapState, useStore } from 'vuex'

export const useMapState = (getKeys: string[]) => {

    const store = useStore();
    const storeState: any = {};
    const storeFns = mapState(getKeys);
    Object.keys(storeFns).forEach((fnKeys: string) => {
        const fn = storeFns[fnKeys].bind({ $store: store })
        storeState[fnKeys] = computed(fn)
    })

    return storeState;
}