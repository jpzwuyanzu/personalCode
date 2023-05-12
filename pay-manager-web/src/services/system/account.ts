import request from '@/utils/request';
export default {
  /**
   * 新增
   */
  add(params: any) {
    return request.post('/system/user/add', params);
  },
  /**
   * 编辑
   */
  edit(params: any) {
    return request.post('/system/user/edit', params);
  },
  /**
   * 修改状态
   */
  changeStatus(params: any) {
    return request.post('/system/user/changeStatus', params);
  },
  /**
   * 列表查询
   */
  list(params: any) {
    return request.table('/system/user/list', params, { method: 'get', customConfig: { filter: true  }});
  },
  /**
   * 获取用户详细信息
   */
  getUserDetails(params: any) {
    const { userId } = params;
    return request.get(`/system/user/${userId}`, params).then((res: any) => Promise.resolve(res?.data));
  },
  /**
   * 修改密码
   */
  updatePassword(params: any) {
    return request.post('/system/user/resetPwd', params)
  },
  /**
   * 获取google随机密钥
   */
  getInitGoogleKey():Promise<string> {
    return request.get('/system/user/getGoogleKey')
  },
  /**
   * 获取用户google密钥
   */
  getUserGoogleKey(params: Record<'userId', string>):Promise<string> {
    return request.get('/system/user/queryGoogleKey', { params })
  },
  /**
   * 保存用户google密钥
   */
  setUserGoogleKey(params: any) {
    return request.get('/system/user/saveGoogleKey', { params })
  },
  /**
   * 获取用户菜单下拉树列表
   */
  getUserRouterMenu(params: any) {
    return request.get('/system/user/userTree', { params })
  }
};
