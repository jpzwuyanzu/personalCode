import request from './../utils/request'

export function addAddress (params) {
  return request.post('/api/address/addAddress', params)
}

export function addresslist (params) {
  return request.get('/api/address/addresslist', params)
}