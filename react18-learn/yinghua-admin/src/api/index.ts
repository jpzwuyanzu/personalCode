import request from './../utils/request'

export function getDemo (params: any) {
    return request.get('/test/load', {params})
}
export function postDemo (params: any) {
    return request.post('/test/post', params)
}

//登录接口
export function LoginNow (params: any) {
    return request.post('/api/sys/user/login', params)
}
// 退出登录
export function loginOut (params?: any) {
    return request.post('/api/sys/user/logout', params)
}