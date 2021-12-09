import request from './../utils/request'

export function getProCategory (params) {
    return request.get('/api/pro/category', { params })
}

export function searchPro (params) {
    return request.post('/api/pro/searchPro', params)
}