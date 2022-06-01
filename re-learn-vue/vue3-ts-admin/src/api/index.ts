import request from './../utils/request'

export function getDemo (params: any) {
    return request.get('/test/load', params)
}
export function postDemo (params: any) {
    return request.post('/test/post', { params })
}

//充值列表
export function getOrderList (params: any) {
    return request.get('/orderList.json', params)
}