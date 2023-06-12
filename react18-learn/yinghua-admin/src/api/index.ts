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
export function addRole (params?: any) {
    return request.post('/api/sys/user/role/addRole', params)
}
//删除角色
export function delRole (params?: any) {
    return request.post('/api/sys/user/role/deleterolebyid', params)
}
// 角色权限详情
export function roleDetail (params? :any) {
    return request.post('/api/sys/user/role/info', params)
}
//所有菜单树形结构
export function treeMenuList (params? :any) {
    return request.post('/api/sys/usernode/list', params)
}
//支付后台用户列表
export function userList (params? :any) {
    return request.post('/api/sys/user/list', params)
}
//新增编辑后台用户
export function createUser (params? :any) {
    return request.post('/api/sys/user/user/save', params)
}
//删除支付后台用户
export function delUser (params? :any) {
    return request.post('/api/sys/user/user/delete', params)
}
//重置密码
export function resetUser (params? :any) {
    return request.post('/api/sys/user/user/resetpwd', params)
}
//上游支付渠道列表
export function upStreamChannelList (params? :any) {
    return request.post('/api/channel/pay/listPage', params)
}
//修改上游支付渠道信息
export function upDateUpStreamChannel (params? :any) {
    return request.post('/api/channel/pay/updateChannel', params)
}
//上游商户支付信息列表
export function upStreamMerchant (params? :any) {
    return request.post('/api/channel/top/topMerchantList', params)
}
//修改上游商户支付信息
export function upDateUpStreamMerchant (params? :any) {
    return request.post('/api/channel/top/updateTopMerchant', params)
}
//支付方式列表
export function payTypeList (params? :any) {
    return request.post('/api/channel/pay/payTypeList', params)
}
//修改支付方式列表
export function upDatePayTypeList (params? :any) {
    return request.post('/api/channel/pay/updatePayType', params)
}







