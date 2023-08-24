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
//查询在线代理列表
export function getOnlineAgent (params? :any) {
    return request.post('/chat/agent/onlineAgent', params)
}
//查询公告信息
export function getAgentNotice (params? :any) {
    return request.post('/chat/agent/notice/queryNotice', params)
}