import request from './../utils/request'

export function laodProData (params) {
    return request.get('/product.json', { params })
}