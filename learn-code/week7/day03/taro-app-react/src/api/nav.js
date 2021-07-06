import request from './../utils/request'

export function getNavlist () {
  return request.get('/api/nav/navlist')
}