import request from '@/utils/request';
import services from '@/services';
import _ from 'lodash';

export default {
  /**
   * USDT充值列表
   */
  list: (params: any) => {
    return request.get(`/financial/exchange/findList`, { params });
  },
  /**
   * 新增
   */
  add: (params: any) => {
    return request.post(`/financial/exchange/addExchange`, params);
  },
  /**
   * 编辑
   */
  edit: (params: any) => {
    return request.post(`/financial/exchange/updateExchange`, params);
  },
  /**
   * 商户设置
   */
  updateMerchant: (params: any) => {
    return request.post(`/financial/exchange/updateMerchant`, params);
  },
  /**
   * 币种设置
   */
  updateCurrency: (params: any) => {
    return request.post(`/financial/exchange/updateCurrency`, params);
  },
  /**
   * 保留金额设置
   */
  saveMinAmount: (params: any) => {
    return request.post(`/financial/exchangeStrategy/saveMinAmount`, params);
  },
  /**
   * 获取提现策略配置
   */
  getStrategy: (params?: any) => {
    return request.get(`/financial/exchangeStrategy/findStrategy`, {
      params,
    });
  },
  /**
   * 提现机制配置
   */
  saveStrategy: (params: any) => {
    return request.post(`/financial/exchangeStrategy/saveStrategy`, params);
  },
  /**
   * 货币系数列表
   */
  listCurrencyRate: (params: any) => {
    return request.get(`/financial/currency/findList`, { params });
  },
  /**
   * 货币系数配置
   */
  updateCurrencyRate: (params: any) => {
    return request.post(`/financial/currency/saveCurrency`, params);
  },
  /**
   * 查询币种余额
   */
  getBalanceMap: async (params: any) => {
    const items: any = await services.accountInfo.getMerchantInfo(params);
    const currencyItems = _.get(items, '[0].currency', '').split(',');
    const currencyMap: any = {};
    currencyItems.forEach((currency: string, index: number) => {
      currencyMap[currency] = items[index];
    });
    return currencyMap;
  },
};
