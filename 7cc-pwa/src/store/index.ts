import useCustabStore from "@/store/modules/custab";
import useCusThemeStore from '@/store/modules/theme';
import useUserStore from "@/store/modules/user";
import useCommonStore from "@/store/modules/common";

//统一导出useCustabStore方法
export default function useStore () {
    return {
        custab: useCustabStore(),
        custheme: useCusThemeStore(),
        user: useUserStore(),
        common: useCommonStore()
    }
} 