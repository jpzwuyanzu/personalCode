import request from '@/utils/request';

export default {
  /**
   * 商户充值信息配置列表
   */
  list: (params: any) => {
    return request.table(`/financial/configRecharge/findPage`, params);
  },
  /**
   * 添加商户充值信息配置
   */
  add: (params: any) => {
    return request.post(`/financial/configRecharge/saveRecharge`, params);
  },
  /**
   * 编辑商户充值信息配置
   */
  edit: (params: any) => {
    return request.post(`/financial/configRecharge/updateRecharge`, params);
  },
  /**
   * 更改商户充值信息配置状态
   */
  changeStatus: (params: any) => {
    return request.post(`/financial/configRecharge/updateStatus`, params);
  },
  /**
   * 商户设置
   */
  updateMerchant: (params: any) => {
    return request.post(`/financial/configRecharge/updateMerchant`, params);
  },
  /**
   * 币种设置
   */
  updateCurrency: (params: any) => {
    return request.post(`/financial/configRecharge/updateCurrency`, params);
  },
  /**
   * 通过币种查询USDT地址
   */
  findUSDTAddress: (params: any) => {
    return request.get(`/financial/configRecharge/findRechargeUSDT`, {
      params,
    });
  },
};
