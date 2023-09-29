import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
export function useLoading() {
    NProgress.configure({ showSpinner: false })
    // 显示loadig
    const showNprogress = () => {
        NProgress.start()
    }
    // 隐藏loading 
    const hiddenNProgress = () => {
        NProgress.done()
    }
    return {showNprogress, hiddenNProgress}
}