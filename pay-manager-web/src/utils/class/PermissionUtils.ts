/**
 * 权限管理类
 */
class PermissionUtils {
  protected pagePermission: any[] = [];

  protected pageResource: Record<string, string[]> = {};

  /**
   * 初始化权限
   * @param permission
   */
  initPermission(permission: any[]) {
    if (Array.isArray(permission)) {
      // 页面权限
      const pagePermission: any[] = [
        {
          name: '首页',
          path: '',
        },
      ];
      // 页面对应的功能权限
      const pageResource: Record<string, string[]> = {};

      this.getPagePermission(permission, pagePermission, pageResource);
      this.pagePermission = pagePermission;
      this.pageResource = pageResource;
      console.log('initPermission pagePermission', pagePermission);
      console.log('initPermission pageResource', pageResource);
    }
  }

  /**
   * 获取页面权限
   * @param permission
   * @param pagePermission
   * @param pageResource
   */
  private getPagePermission = (
    permission: any[],
    pagePermission: any[],
    pageResource: Record<string, string[]>,
  ) => {
    const getPageResourceList = (children: any[], dataList: any[]) => {
      children.forEach((item: any) => {
        // 以下均计算为页面的功能权限， 放于一个list中，方便取值
        if (item.id && item.id.toString().length >= 6) {
          dataList.push(item.path);
          if (item.children && item.children.length) {
            getPageResourceList(item.children, dataList);
          }
        }
      });
    };

    permission.forEach((pageItem: any) => {
      if (pageItem.id && pageItem.path) {
        // 这里为页面的
        if ([2, 4].includes(String(pageItem.id).length)) {
          pagePermission.push({
            name: pageItem.label,
            path: pageItem.path,
          });

          if (pageItem.children && pageItem.children.length) {
            const resourceList: any[] = [];
            getPageResourceList(pageItem.children, resourceList);
            this.getPagePermission(
              pageItem.children,
              pagePermission,
              pageResource,
            );
            pageResource[pageItem.path] = resourceList;
          }
        } else if (pageItem.children && pageItem.children.length) {
          this.getPagePermission(
            pageItem.children,
            pagePermission,
            pageResource,
          );
        }
      }
    });
  };

  /**
   * 是否有异步数据路由
   */
  hasAsyncRouter() {
    return !!this.pagePermission.length;
  }

  /**
   * 检测页面权限
   * @param pathname
   */
  checkPageAccess = (pathname: string) => {
    if (pathname === '/' || pathname === '') return true;
    return this.pagePermission.some(
      (item: Record<string, string>) => item.path === pathname,
    );
  };

  /**
   * 检测页面-按钮权限
   * @param key
   * @param pathname
   */
  checkPageResource = (key: string, pathname = window.location.pathname) => {
    const pathList = this.pageResource[pathname] || [];
    const result = pathList.some((item: string) => item === key);
    return result;
  };

  static instance: PermissionUtils;

  static getInstance() {
    if (!this.instance) {
      this.instance = new PermissionUtils();
    }
    return this.instance;
  }
}

export default PermissionUtils.getInstance();
