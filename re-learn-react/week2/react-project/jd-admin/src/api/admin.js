import request from './../utils/request'

export function adminLogin (params) {
   return  request.get('account.json', { params })
}

export function loadAdminList (params) {
   return request.get('/adminlist.json', { params })
}