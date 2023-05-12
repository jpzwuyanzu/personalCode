import request from '@/utils/request';

export default {
  /**
   * USDT充值列表
   */
  list: (params: any) => {
    return request.post(`/financial/rechargeOrder/findPage`, params);
  },
  /**
   * 更改状态
   */
  updateStatus: (params: any) => {
    return request.post(`/financial/rechargeOrder/updateStatus`, params);
  },
  /**
   * 管理后台发起充值
   */
  recharge: (params: any) => {
    return request.post(`/financial/rechargeOrder/addRechargeOrder`, params);
  },
  /**
   * 发起充值
   */
  merchantRecharge: (params: any) => {
    return request.post(`/financial/rechargeOrder/addOrder`, params);
  },
  /**
   * 查询币种USDT地址
   */
  getUSDTAddress: (params: any) => {
    return request.get(`/financial/configRecharge/findRechargeUSDT`, {
      params,
    });
  },
  /**
   * 查询币种列表
   */
  getCurrencyOptions: async () => {
    const data: any[] = await request.get(
      `/financial/currency/findListForRecharge`,
    );
    return data.map((item) => {
      return {
        label: `${item.currency} - ${item.currencyName}`,
        value: item.currency,
        ...item,
      };
    });
  },
};
