import { computed } from 'vue';
import useStore from "@/store";
//自定义组合式函数
export function usePiniaState () {
    const { custheme, custab, user, common } = useStore();
    const theme: any = computed(() => custheme.theme); 
    const activeTab: any = computed(() => custab.activeTab);
    const userInfo: any  = computed(() => user.userInfo);
    const loginState: any = computed(() => user.loginState);
    const loginSheetState: any = computed(() => common.loginSheetState);

    return { custheme, theme, custab, activeTab, user, userInfo, loginState, common, loginSheetState } 
}