import request from '@/utils/request';

export default {
  /**
   * 代收订单列表
   */
  list(params: any) {
    return request.post('/merchant/collection/orderList', params);
  },

  /**
   * 订单回调
   */
  callback(params: any) {
    return request.post('/merchant/collection/rechargeOrderCallback', params);
  },

  /**
   * 导出表格
   */
  export(params: any) {
    return request.download('/merchant/exportCollectionOrder', params);
  },

  /**
   * 修改订单支付状态
   */
  updatePayStatus(params: any) {
    return request.post('/merchant/collection/changePayStatus', params);
  },

  /**
   * 刷新订单
   */
  refresh(params: any) {
    return request.post('/merchant/collection/rechargeOrderQuery', params);
  },

  /**
   * 查询订单
   */
  queryOrder(params: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          request.post('/merchant/collection/queryOneRechargeOrder', params),
        );
      }, 3000);
    });
  },
};