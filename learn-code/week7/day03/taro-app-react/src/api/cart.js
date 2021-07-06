import request from './../utils/request'

export function addCartFn (params) {
  return request.post('/api/cart/addCart', params)
}

export function getPersonalCart (params) {
  return request.get('/api/cart/getPersonalCart', params)
}

export function deleteCart (params) {
  return request.get('/api/cart/deleteCart', params)
}

export function updateCartNum (params) {
  return request.get('/api/cart/updateCartNum', params)
}

export function updateCartFlag (params) {
  return request.get('/api/cart/updateCartFlag', params)
}

export function updateCartAllFlag (params) {
  return request.get('/api/cart/updateCartAllFlag', params)
}

export function cartRecommend (params) {
  return request.get('/api/cart/cartRecommend', params)
}