import request from './../utils/request'

export function loginApi(params) {
    return request.post('/userInfo.json', params)
}

export function getBanner(params) {
    return request.get('/banner/', { params })
}
