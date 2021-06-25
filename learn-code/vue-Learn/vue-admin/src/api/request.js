import instance from '@/api/axios'//引入axios文件

export function loginByUsername(obj) {
  return instance.post(`/api/a/login`, obj)
}
export function logout() {
  // 退出  
return instance.post(`/api/a/logout`)
}