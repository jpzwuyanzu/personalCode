import request from '@/utils/request';
export default {
  /**
   * 账变记录
   */
  list(params: any) {
    return request.post('/merchant/accountChangeList', params);
  },
  /**
   * 导出账变记录
   */
  export(params: any) {
    return request.download('/merchant/accountChangeExport', params);
  },
};
