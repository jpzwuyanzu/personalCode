import request from './../utils/request'

export function getDemo (params: any) {
    return request.get('/test/load', {params})
}
export function postDemo (params: any) {
    return request.post('/test/post', params)
}
/**
 * 支付后台接口
 */

//登录接口
export function LoginNow (params: any) {
    return request.post('/api/sys/user/login', params)
}
// 退出登录
export function loginOut (params?: any) {
    return request.post('/api/sys/user/logout', params)
}
// 获取角色列表
export function loadRoleList (params?: any) {
    return request.post('/api/sys/user/role/list', params)
}
//编辑角色
export function editRole (params?: any) {
    return request.post('/api/sys/user/role/update', params)
}
//新增角色

//删除角色
export function delRole (params?: any) {
    return request.post('/api/sys/user/role/deleterolebyid', params)
}


