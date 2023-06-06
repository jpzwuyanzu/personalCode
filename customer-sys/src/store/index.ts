import useUserStore from './modules/user'
import useCounterStore from './modules/counter'

// 统一导出useStore方法
export default function useStore() {
  return {
    user: useUserStore(),
    counter: useCounterStore(),
  }
}