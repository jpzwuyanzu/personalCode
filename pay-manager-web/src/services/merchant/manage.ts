import request from '@/utils/request';
import { req } from 'pino-std-serializers';
import services from '@/services';
export default {
  /**
   * 添加商户
   */
  add(params: any) {
    return request.post('/merchant/add', params);
  },
  /**
   * 更新商户
   */
  edit(params: any) {
    return request.post('/merchant/update/info', params);
  },
  /**
   * 修改商户状态
   */
  changeStatus(params: any) {
    return request.post('/merchant/update/status', params);
  },
  /**
   * 商户列表
   */
  list(params: any) {
    return request.table('/merchant/list', params);
  },
  /**
   * 修改商户额度
   */
  changeBalance(params: any) {
    return request.post(`/merchant/update/amount`, params);
  },
  /**
   * 修改余额记录
   */
  changeBalanceList(params: any) {
    return request.table('/merchant/balanceList', params);
  },
  /**
   * 通道列表
   */
  channelList(params: any) {
    return request.post('/merchant/findMerchantTunnelPage', params);
  },
  /**
   * 修改通道状态
   */
  changeChannelStatus(params: any) {
    return request.post('/tunnel/config/update/status', params);
  },
  /**
   * 修改通道费率
   */
  changeChannelRate(params: any) {
    return request.post('/tunnel/config/update/rate', params);
  },
  /**
   * 启用通道
   */
  enableChannel(params: any) {
    return request.post('/merchant/enableMerchantTunnel', params);
  },
  /**
   * 禁用通道
   */
  disableChannel(params: any) {
    return request.post('/merchant/disableMerchantTunnel', params);
  },
  /**
   * 通道分配
   */
  tunnelDistributeList(params: any) {
    return request.post('/merchant/tunnelDistributeList', params);
  },
  /**
   * 获取批量分配通道列表
   */
  findAllConfigTunnel(params: any = {}) {
    return request.post('/merchant/findAllConfigTunnel', params);
  },
};