import useCustabStore from "@/store/modules/custab";
import useCusThemeStore from '@/store/modules/theme'

//统一导出useCustabStore方法
export default function useStore () {
    return {
        custab: useCustabStore(),
        custheme: useCusThemeStore()
    }
} 