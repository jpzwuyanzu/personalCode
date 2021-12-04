import request from './../utils/request'

export function postData (params) {
  return request.post('/test/add', params)
}

export function getData (params) {
    return request.get('/test/list', {params})
  }