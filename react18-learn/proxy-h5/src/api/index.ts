import request from './../utils/request'

export function getDemo (params: any) {
    return request.get('/test/load', params)
}
export function postDemo (params: any) {
    return request.post('/test/post', {params})
}

// 上传图片到fast接口
export function uploadFastImg (params? :any) {
    return request.post('/api/sys/upload/uploadFile', params)
}