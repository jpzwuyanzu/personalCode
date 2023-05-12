import request from '@/utils/request';
export default {
  chart(params: any) {
    return request.post('/merchant/chart', params);
  },
};
