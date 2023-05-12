import request from '@/utils/request';
export default {
  /**
   * 添加提醒
   */
  add(params: any) {
    return request.post('/merchant/remind/add', params);
  },
  /**
   * 删除提醒
   */
  del(params: any) {
    return request.post('/merchant/remind/del', params);
  },
  /**
   * 编辑提醒
   */
  edit(params: any) {
    return request.post('/merchant/remind/edit', params);
  },
  /**
   * 提醒列表
   */
  list(params: any) {
    return request.table('/merchant/remind/list', params);
  },
};
