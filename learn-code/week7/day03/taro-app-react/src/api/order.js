import request from './../utils/request'

export function addOrder (params) {
  return request.post('/api/order/addOrder', params)
}

export function confirmOrder (params) {
  return request.get('/api/order/confirmOrder', params)
}

export function updateOrderAddress (params) {
  return request.post('/api/order/updateOrderAddress', params)
}

export function deleteCartItem (params) {
  return request.get('/api/order/deleteCartItem', params)
}

export function payment (params) {
  return request.get('/api/pay/payment', params)
}