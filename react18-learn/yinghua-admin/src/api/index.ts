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
    return request.post('/api/sys/user/login', {'requestTimeStamp': (new Date()).getTime() , ...params})
}
// 退出登录
export function loginOut (params?: any) {
    return request.post('/api/sys/user/logout', {'requestTimeStamp': (new Date()).getTime() , ...params})
}
// 获取角色列表
export function loadRoleList (params?: any) {
    return request.post('/api/sys/user/role/list', {'requestTimeStamp': (new Date()).getTime() , ...params})
}
//编辑角色
export function editRole (params?: any) {
    return request.post('/api/sys/user/role/update', {'requestTimeStamp': (new Date()).getTime() , ...params})
}
//新增角色
export function addRole (params?: any) {
    return request.post('/api/sys/user/role/addRole', {'requestTimeStamp': (new Date()).getTime() , ...params})
}
//删除角色
export function delRole (params?: any) {
    return request.post('/api/sys/user/role/deleterolebyid', {'requestTimeStamp': (new Date()).getTime() , ...params})
}
// 角色权限详情
export function roleDetail (params? :any) {
    return request.post('/api/sys/user/role/info', {'requestTimeStamp': (new Date()).getTime() , ...params})
}
//所有菜单树形结构
export function treeMenuList (params? :any) {
    return request.post('/api/sys/usernode/list', {'requestTimeStamp': (new Date()).getTime() , ...params})
}
//支付后台用户列表
export function userList (params? :any) {
    return request.post('/api/sys/user/list', {'requestTimeStamp': (new Date()).getTime() , ...params})
}
//新增编辑后台用户
export function createUser (params? :any) {
    return request.post('/api/sys/user/user/save', {'requestTimeStamp': (new Date()).getTime() , ...params})
}
//删除支付后台用户
export function delUser (params? :any) {
    return request.post('/api/sys/user/user/delete', {'requestTimeStamp': (new Date()).getTime() , ...params})
}
//重置密码
export function resetUser (params? :any) {
    return request.post('/api/sys/user/user/resetpwd', {'requestTimeStamp': (new Date()).getTime() , ...params})
}
//上游支付渠道列表
export function upStreamChannelList (params? :any) {
    return request.post('/api/channel/pay/listPage', {'requestTimeStamp': (new Date()).getTime() , ...params})
}
//修改上游支付渠道信息
export function upDateUpStreamChannel (params? :any) {
    return request.post('/api/channel/pay/updateChannel', {'requestTimeStamp': (new Date()).getTime() , ...params})
}
//上游商户支付信息列表
export function upStreamMerchant (params? :any) {
    return request.post('/api/channel/top/topMerchantList', {'requestTimeStamp': (new Date()).getTime() , ...params})
}
//修改上游商户支付信息
export function upDateUpStreamMerchant (params? :any) {
    return request.post('/api/channel/top/updateTopMerchant', {'requestTimeStamp': (new Date()).getTime() , ...params})
}
//支付方式列表
export function payTypeList (params? :any) {
    return request.post('/api/channel/pay/payTypeList', {'requestTimeStamp': (new Date()).getTime() , ...params})
}
//修改支付方式列表
export function upDatePayTypeList (params? :any) {
    return request.post('/api/channel/pay/updatePayType', {'requestTimeStamp': (new Date()).getTime() , ...params})
}
// 上传fast接口
export function uploadFastImg (params? :any) {
    return request.post('/api/sys/upload/uploadFile', params)
}
//查询游戏列表
export function gameList (params? :any) { 
    return request.post('/api/gameInfo/listPage', {'requestTimeStamp': (new Date()).getTime() , ...params})
}
//新增游戏信息
export function addGameList (params? :any) {
    return request.post('/api/gameInfo/save', {'requestTimeStamp': (new Date()).getTime() , ...params})
}
//编辑游戏信息
export function updateGameList (params? :any) {
    return request.post('/api/gameInfo/update', {'requestTimeStamp': (new Date()).getTime() , ...params})
}
//删除游戏信息
export function delGameList (params? :any) {
    return request.post('/api/gameInfo/delById', {'requestTimeStamp': (new Date()).getTime() , ...params})
}
//查询游戏套餐
export function gamePkgList (params? :any) {
    return request.post('/api/gamepkg/list', {'requestTimeStamp': (new Date()).getTime() , ...params})
}
//新增游戏套餐
export function addGamePkg (params? :any) {
    return request.post('/api/gamepkg/save', {'requestTimeStamp': (new Date()).getTime() , ...params})
}
//编辑游戏套餐
export function updateGamePkg (params? :any) {
    return request.post('/api/gamepkg/update', {'requestTimeStamp': (new Date()).getTime() , ...params})
}
//删除游戏套餐
export function delGamePkg (params? :any) {
    return request.post('/api/gamepkg/delete', {'requestTimeStamp': (new Date()).getTime() , ...params})
}







