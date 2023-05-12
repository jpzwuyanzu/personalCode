import request from '@/utils/request';
export default {
  getLeft(params: any) {
    return request.post('/data/total/left', params, {
      customConfig: { filter: true },
    });
  },
  getRight(params: any) {
    return request.post('/data/total/right', params, {
      customConfig: { filter: true },
    });
  },
  getStatisticeList(params: any) {
    return request.table('/data/total/list', params, { method: 'get' });
  },
  exportStatisticeList(params: any) {
    return request.post('/data/total/listExport', params);
  },
  getNoticeList() {
    return request.post('/merchant/remind/pushList');
  },
};
