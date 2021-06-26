import request from '../util/request'
export function getHomeData(params: any) {
    return request.post('/userInfo.json', params)
}

export function getBanner(params: any) {
    return request.get('/banner/', { params })
}