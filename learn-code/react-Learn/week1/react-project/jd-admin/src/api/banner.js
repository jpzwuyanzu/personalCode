import request from './../utils/request'

export function addBanner(params) {
    return request.post('/banner/add', params)
}

export function getBanner(params) {
    return request.get('/banner/', { params })
}

export function deleteBanner(params) {
    return request.get('/banner/delete', { params })
}

export function deleteAllBanner(params) {
    return request.post('/banner/deleteAll', params )
}