import request from './../utils/request'

export function  loginAdmin (params) {
   return  request.get('/user.json', {params})
}