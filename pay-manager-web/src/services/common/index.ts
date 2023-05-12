import request from '@/utils/request';
import _ from 'lodash';

export default {
  /**
   * 管理范围
   */
  async tenantTree() {
    const { data = {} }: any = await request.get(
      '/system/common/tenantTreeAll',
    );
    return _.flatten(Object.values(data)) as any;
  },
  async tenantMap() {
    const treeData = await this.tenantTree();
    const map: any = {};
    const nameMap: any = {};
    // 递归展平
    const flatten = (data: any[]) => {
      data.forEach((item: any) => {
        if (!map[item.tid]) {
          map[item.tid] = item;
          nameMap[item.tid] = item.tName;
        }

        if (item.child) {
          flatten(item.child);
        }
      });
    };
    flatten(treeData);

    Object.values(map).forEach((item: any) => {
      const parentName = _.get(map, `[${item.parentId}].tName`, '');
      if (parentName) {
        nameMap[item.tid] = `${parentName}/${item.tName}`;
      }
      const parent = map[item.parentId];
      if (parent) {
        const parentParentName = _.get(map, `[${parent.parentId}].tName`, '');
        if (parentParentName) {
          nameMap[item.tid] = `${parentName}/${nameMap[item.tid]}`;
        }
      }
    });

    return nameMap;
  },
  /**
   * 获取服务器时间
   */
  getSystemTime() {
    return request.get('/system/common/systemTime', {});
  },

  /**
   * 获取货币配置列表
   */
  getSystemCurrency(params = { rateType: 1 }) {
    return request.get('/financial/currency/findList', { params });
  },

  /**
   * 获取全部商户
   */
  getSystemMerchant() {
    return request.get('/merchant/info/list');
  },
};
