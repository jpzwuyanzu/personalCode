import { useState } from 'react';
import services from '@/services';

export default () => {
  const [merchantInfo, setMerchantInfo] = useState({
    isPayPassword: '',
    userId: '',
    userName: '',
    merchantName: '',
    merchantId: '',
    usdt: '',
  });

  const [isAdmin, setIsAdmin] = useState(false);
  const [isFirstPayPassword, setIsFirstPayPassword] = useState(false);

  const getMerchantInfo = async () => {
    const merchantData: any = await services.accountInfo.getAccountInfo();
    setMerchantInfo(merchantData);
    setIsAdmin(merchantData.userName === 'admin');
    return merchantData;
  };

  return {
    isAdmin,
    merchantInfo,
    getMerchantInfo,
    isFirstPayPassword,
    setIsFirstPayPassword,
  };
};