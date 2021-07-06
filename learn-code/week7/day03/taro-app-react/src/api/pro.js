import request from './../utils/request'

export function getProlist (params) {
  return request.get('/api/pro/list', params)
}

export function getProDetail(params) {
  return request.get('/api/pro/detail', params)
}