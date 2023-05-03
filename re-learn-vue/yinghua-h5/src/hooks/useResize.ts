import { onMounted, onUnmounted } from 'vue'
export function useResize(onResize: any) {
    onMounted(() => {
        window.addEventListener('resize', onResize)
    })
    onUnmounted(() => {
        window.removeEventListener('resize', onResize)
    })
}