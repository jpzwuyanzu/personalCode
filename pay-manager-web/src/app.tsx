import { history, useModel } from 'umi';
import utils from '@/utils';
import { useAsyncEffect } from 'ahooks';
import { EnterModeEnum } from '@/enums';
import { APP_USER_INFO } from '@/constants/storage';
import common from '@/utils/common';
import services from '@/services';
import { APP_NAME, System } from '@/constants';
import logo from '@/assets/logo.png';
import HeaderRight from '@/components/HeaderRight';

// 运行时配置
// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://next.umijs.org/docs/api/runtime-config#getinitialstate
export const getInitialState: any = async () => {
  return {};
};

export const layout = () => {
  const { enterMode, isLogin, userInfo, _getUserInfo, _logout } =
    useModel('user');

  useAsyncEffect(async () => {
    // 已登录且是刷新模式
    if (isLogin && enterMode === EnterModeEnum.Refresh) {
      await _getUserInfo();
    }
  }, [isLogin]);

  return {
    logo,
    title: APP_NAME,
    layout: 'mix',
    menu: {
      locale: false,
    },
    rightContentRender: () => HeaderRight(),
  };
};

const excludesPath = ['/login', '/404', '/'];

// 由于一级路由去掉了 '/', 故需要处理数据
const getRealPath = (path: string) =>
  String(path).split('/').length === 2 ? path.replace('/', '') : path;

const validPath = (path: string) => {
  if (excludesPath.includes(path)) {
    return true;
  }

  const realPath = getRealPath(path);
  return common.permissionUtils.checkPageAccess(realPath);
};

const filterRoutes = (staticRoutes: any[]) => {
  return staticRoutes.filter((routeItem: any) => {
    let { children, routes, path } = routeItem;

    if (children && children.length) {
      routeItem.children = filterRoutes(children);
    }

    if (routes && routes.length) {
      routeItem.routes = filterRoutes(routes);
    }
    return validPath(path);
  });
};

export function patchClientRoutes({ routes }: any) {
  if (common.permissionUtils.hasAsyncRouter()) {
    filterRoutes(routes);
  }
}

export const render = async (routerRender: any) => {
  const loginPath = '/login';
  const userinfo = utils.localStorage.get(APP_USER_INFO) ?? {};
  const isLogin = userinfo.userName && userinfo.token;
  if (isLogin) {
    try {
      await services.user.getUserRouter();
      // 如果是访问登录页面，回到主页
      if (location.pathname === loginPath) {
        history.push('/');
      } else {
        const realPath = getRealPath(location.pathname);
        // url输入错误的地址会进入404
        if (!common.permissionUtils.checkPageAccess(realPath)) {
          history.push('/404');
        }
      }
      routerRender();
    } catch (e) {
      history.push(loginPath);
      routerRender();
    }
  } else {
    history.push(loginPath);
    routerRender();
  }
};
