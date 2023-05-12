// 全局共享数据示例
import { useState } from 'react';
import { history } from 'umi';
import services from '@/services';
import { APP_USER_INFO } from '@/constants/storage'
import utils from '@/utils';
import { EnterModeEnum } from '@/enums'

const localUserInfo = utils.localStorage.get(APP_USER_INFO) ?? {}

const initialUserInfo = {
  userName: localUserInfo.userName ?? '',
  roleName: '',
  token: localUserInfo.token ?? '',
  userId: -1,
}
const initialIsLogin = localUserInfo.userName && localUserInfo.token


const userModel = () => {
  const [enterMode, setEnterMode] = useState(EnterModeEnum.Refresh)
  const [isLogin, setIsLogin] = useState(initialIsLogin)
  const [userInfo, setUserInfo] = useState(initialUserInfo)


  const updateUserInfo = (params: any) => {
    setUserInfo({
      ...userInfo,
      ...params
    })
  }

  /**
   * 接口获取用户信息
   */
  const _getUserInfo = async () => {
    const data: any = await services.user.getUserInfo();
    const user = data?.user ?? {};
    const roles = user?.roles ?? []

    updateUserInfo({
      ...userInfo,
      userName: user?.userName ?? '',
      roleName: roles[0]?.roleName ?? '',
      userId: user?.userId ?? -1,
    })
  }

  /**
   * 接口退出登录
   */
  const _logout = async () => {
    // 执行接口退出登录
    await services.user.logout();
    // 清理储存
    utils.localStorage.remove(APP_USER_INFO);

    setTimeout(() => {
      // 去登录
      history.push('/login');
      // 重载，刷新store
      window.location.reload()
    }, 1500)
  }

  return {
    enterMode,
    userInfo,
    isLogin,

    setEnterMode,
    setIsLogin,
    updateUserInfo,

    _getUserInfo,
    _logout,
  };
};

export default userModel;
