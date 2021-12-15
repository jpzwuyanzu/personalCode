import request from './../utils/request'

export function getCategory (params) {
    return request.get('/navcategory.json', { params })
}