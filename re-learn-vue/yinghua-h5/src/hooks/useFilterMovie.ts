import { ref, reactive } from 'vue'
import { useRouter, useRoute } from 'vue-router'
export function useFiltermovie() {
    const appRouter = useRouter();
    const appRoute = useRoute();
    const filterParams = reactive<any>({
        region: 0,
        type: 0,
        year: 0,
        sort: 0
    })
    const cusPageData = reactive<any>({
        currentPage: 1,
        totalItems: 100,
        showPageSize: 5,
        pageSize: 5
    })
    const filterMeter = ref<string>('');
    const collectChange = (type: string, params: any) => {
        if(type === 'filter') {
            console.log('过滤数据', params)
        } else {
            console.log('分页数据', params)
        }
        console.log(filterParams, cusPageData)
        filterMeter.value = `?region=${filterParams.region}&type=${filterParams.type}&year=${filterParams.year}&sort=${filterParams.sort}&page=${cusPageData.currentPage}`
        appRouter.push(`${appRoute.path}${filterMeter.value}`)
        loadMovieData()
    }
    const loadMovieData = () => {
        console.log('获取电影数据',filterMeter.value)
        return [1,2,3,4,5,6,7,8,9]
    }
    return { collectChange,  loadMovieData, filterParams, cusPageData}
}