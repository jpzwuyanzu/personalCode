import request from '@/utils/request';
import { message } from 'antd';
import utils from '@/utils';
import common from '@/utils/common';
import { APP_USER_INFO } from '@/constants/storage';

export default {
  /**
   * 登录
   */
  login(params: any): Promise<Record<'token', string>> {
    return request.post('/login', params);
  },

  /**
   * 登出
   */
  logout() {
    return request.post('/logout', {});
  },

  /**
   * 获取个人信息
   */
  getUserInfo() {
    return request.get('/getInfo', {});
  },

  /**
   * 获取路由信息
   */
  async getUserRouter() {
    const routes = await request.get('/system/menu/treeselect', {});

    if (Array.isArray(routes) && routes.length) {
      common.permissionUtils.initPermission(routes);
      return Promise.resolve(routes);
    }

    message.warning('该账号无权限，请联系管理员！');

    // 延迟清理，防止重复提示
    setTimeout(() => {
      // 无页面权限时， 清理储存，抛错
      utils.localStorage.remove(APP_USER_INFO);
    }, 1000);
    return Promise.reject(routes);
  },

  /**
   * 重置密码
   */
  resetUserPwd(params: Record<'oldPassword' | 'newPassword', string>) {
    return request.put('/system/profile/updatePwd', params);
  },
};
