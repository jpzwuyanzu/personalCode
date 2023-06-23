import { computed } from 'vue';
import useStore from "@/store";
//自定义组合式函数
export function useTheme () {
    const { custheme } = useStore();
    const theme: any = computed(() => custheme.theme); 
    return { custheme, theme } 
}