import request from '@/utils/request';
import { APP_IS_PAYMENT } from '@/constants';

export default {
  /**
   * 获取下拉框的通道id
   */
  getTunnelIdList(params: Record<'type', number>) {
    return request.post('/tunnel/config/selectValidTunnelIdList', params);
  },

  /**
   * 新增通道
   */
  addTunnelConfig(params: any) {
    return request.post('/tunnel/config/add', params);
  },

  /**
   * 编辑通道
   */
  editTunnelConfig(params: any) {
    return request.post('/tunnel/config/edit', params);
  },

  /**
   * 通道列表
   */
  getTunnelConfigList(params: any) {
    return request.table('/tunnel/config/list', params, {
      method: 'post',
      customConfig: { filter: true },
    });
  },

  /**
   * 修改通道余额
   */
  updateTunnelBalance(params: any) {
    return request.post('/tunnel/config/updateTunnelBalance', params);
  },

  /**
   * 通道分配
   */
  updateTunnelDistribute(params: any) {
    return request.post('/tunnel/config/tunnelDistribute', params);
  },

  /**
   * 启用通道
   */
  enableTunnelConfig(params: any) {
    return request.post('/tunnel/config/enableTunnelByTunnelId', params);
  },

  /**
   * 禁用通道
   */
  disableTunnelConfig(params: any) {
    return request.post('/tunnel/config/disableTunnelByTunnelId', params);
  },

  /**
   * 通道下拉列表
   */
  async getTunnelOptions(params = {}) {
    const items: any = await request.get('/tunnel/config/tunnelOption', {
      params,
    });
    return items.map((item: any) => ({
      label: APP_IS_PAYMENT ? item.tunnelName : item.tunnelId,
      value: item.tunnelId,
    }));
  },

  /**
   * 通道余额记录
   */
  tunnelMoneyRecordList(params: any) {
    return request.table('/tunnel/config/tunnelMoneyRecordList', params, {
      method: 'post',
    });
  },

  /**
   * 获取通道余额
   */
  getTunnelBalance(tunnelId: number | string) {
    const params = {tunnelId};
    return request.get('/tunnel/config/getTunnelBalance', {params});
  },

  /**
   * 提现
   */
  withdraw(params: any) {
    return request.post('/tunnel/config/withdraw', params);
  },
};
