import request from '@/utils/request';

export default {
  /**
   * 提现审核列表
   */
  list: (params: any) => {
    return request.post(`/financial/exchangeOrder/findPage`, params);
  },
  /**
   * 待打款操作
   */
  pendingPay: (params: any) => {
    return request.post(`/financial/exchangeOrder/pending`, params);
  },
  /**
   * 修改状态
   */
  updateStatus: (params: any) => {
    return request.post(`/financial/exchangeOrder/updateStatus`, params);
  },
  /**
   * 发起提现
   */
  withdraw: (params: any) => {
    return request.post(`/financial/exchangeOrder/addOrder`, params);
  },
  /**
   * 提现审核详情
   */
  pendingPayment: (params: any) => {
    return request.post(`/financial/exchangeOrder/pending`, params);
  },
};
