import request, { ContentTypeEnum } from '@/utils/request';
import {CodeEnum} from "@/enums";

export default {
  /**
   * 获取账户信息
   */
  getAccountInfo() {
    return request.get('/system/user/getUserMerchantInfo');
  },

  /**
   * 修改USDT地址
   */
  updateUsdtAddress(params: any) {
    return request.post('/merchant/update/usdt', params);
  },

  /**
   * 修改支付密码
   */
  updatePayPassword(params: any) {
    return request.post('/merchant/update/payPassword', params);
  },

  /**
   * 验证支付密码
   */
  validPayPassword(params: any) {
    return request.post('/merchant/checkPayPassword', params, {
      headers: {
        'Content-Type': ContentTypeEnum.FormData,
      },
    });
  },

  /**
   * 获取接口信息
   */
  getPayApiInfo(params: any = {}) {
    return request.post('/merchant/getMerchantApinInfo', params, {
      headers: {
        'Content-Type': ContentTypeEnum.FormData,
      },
    });
  },

  /**
   * 设置公钥
   */
  updateMerchantSecret(params: any = {}) {
    return request.post('/merchant/updateMerchantSecret', params);
  },

  /**
   * 查询通道列表
   */
  getChannelList(params: any = {}): Promise<any> {
    return request.post('/merchant/findMerchantTunnelPage', params);
  },

  /**
   * 获取商户信息
   */
  getMerchantInfo(params: any = {}) {
    return request.post('/merchant/infoById', params);
  },

  /**
   * 修改回调地址
   */
  updateCallbackUrl(params: any) {
    return request.post('/merchant/updateMerchantCallbackUrl', params);
  },

  /**
   * 划拨金额
   */
  transferAmount(params: any) {
    return request.post('/merchant/transfer', params);
  },
};
