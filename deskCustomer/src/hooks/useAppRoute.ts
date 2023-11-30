import { useRoute, useRouter } from 'vue-router';
//自定义路由hook，暴露appRouter, appRoute
export function useAppRoute (){
    const appRouter = useRouter();
    const appRoute = useRoute();
    return { appRouter, appRoute }
}