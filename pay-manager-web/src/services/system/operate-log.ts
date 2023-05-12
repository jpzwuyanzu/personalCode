import request from '@/utils/request';
export default {
  list(params: any = {}) {
    params.isAsc = 'desc';
    params.orderByColumn = 'operTime';
    return request.table('/system/operlog/list', params);
  },
};
