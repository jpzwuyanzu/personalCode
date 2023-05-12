import request from '@/utils/request';
export default {
  /**
   * 代付订单列表
   */
  list(params: any) {
    return request.post('/merchant/pay/orderList', params);
  },

  /**
   * 订单回调
   */
  callback(params: any) {
    return request.post('/merchant/pay/exchangeOrderCallback', params);
  },

  /**
   * 补单
   */
  makeOrder(params: any) {
    return request.post('/merchant/pay/fixOrder', params);
  },

  /**
   * 驳回订单
   */
  rejectOrder(params: any) {
    return request.post('/merchant/pay/rejectOrder', params);
  },

  /**
   * 导出表格
   */
  export(params: any) {
    return request.download('/merchant/exportPayOrder', params);
  },

  /**
   * 修改订单支付状态
   */
  updatePayStatus(params: any) {
    return request.post('/merchant/pay/changePayStatus', params);
  },

  /**
   * 刷新订单
   */
  refresh(params: any) {
    return request.post('/merchant/pay/exchangeOrderQuery', params);
  },

  /**
   * 查询订单
   */
  queryOrder(params: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(request.post('/merchant/pay/queryOneExchangeOrder', params));
      }, 3000);
    });
  },
};
