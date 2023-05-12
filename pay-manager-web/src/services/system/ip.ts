import request from '@/utils/request';
export default {
  add(params: any) {
    return request.post('/system/ip/white/add', params);
  },
  del(params: any) {
    return request.get('/system/ip/white/delete', { params });
  },
  list(params: any = {}) {
    return request.table('/system/ip/white/list', params, { method: 'get' });
  },
};
