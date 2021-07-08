import request from '../util/request'
export function loginRequest(params?: any) {
    return request.post('http://localhost:3001/userInfo.json', params)
}