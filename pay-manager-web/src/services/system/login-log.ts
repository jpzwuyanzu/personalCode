import request from '@/utils/request';
export default {
  list(params: any = {}) {
    params.isAsc = 'desc';
    params.orderByColumn = 'loginTime';
    return request.table('/system/logininfor/list', params);
  },
};
