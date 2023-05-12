import { Outlet, useModel } from 'umi';
import { useAsyncEffect } from 'ahooks';
import LoadingFull from '@/components/LoadingFull';
import { APP_IS_PAYMENT } from '@/constants';

export default function Layout(props: any) {
  const {
    _getMerchantList,
    _getCurrencyList,
    loadingGlobalDataFinish,
    setLoadingGlobalDataFinish,
    getCurrencyOptionItems,
    getMerchantOptionItems,
  } = useModel('global');
  const { isLogin } = useModel('user');
  const { getMerchantInfo } = useModel('merchant');

  useAsyncEffect(async () => {
    if (isLogin) {
      await _getMerchantList();
      await _getCurrencyList();
      await getCurrencyOptionItems();
      await getMerchantOptionItems();

      if (!APP_IS_PAYMENT) {
        await getMerchantInfo();
      }

      setLoadingGlobalDataFinish(true);
    }
  }, [isLogin]);

  if (!loadingGlobalDataFinish && isLogin) {
    return (
      <div className="basic-layouts">
        <LoadingFull />
      </div>
    );
  }

  return (
    <div className="basic-layouts">
      {props.children}
      <Outlet />
    </div>
  );
}
