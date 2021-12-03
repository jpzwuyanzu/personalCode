import request from './../utils/request'


export function addBanner (params) {
    return request.post('/banner/add', params)
}

export function loadBannerList () {
    return request.get('/banner')
}