// 全局共享数据示例
import { useState } from 'react';
import services from '@/services';
import { unionWith } from 'lodash';
import { System } from '@/constants';
import _ from 'lodash';

const globalModal = () => {
  const [merchantList, setMerchantList] = useState<any[]>([System.BaseAll]);
  const [currencyList, setCurrencyList] = useState<any[]>([System.BaseAll]);

  const [merchantOptionItems, setMerchantOptionItems] = useState<
    System.Items[]
  >([]);

  const [currencyOptionItems, setCurrencyOptionItems] = useState<
    System.Items[]
  >([]);

  const [loadingGlobalDataFinish, setLoadingGlobalDataFinish] = useState(false);

  const getMerchantOptionItems = async (firstOption: any = System.BaseAll) => {
    let _merchantOptionItems = _.cloneDeep(merchantOptionItems);
    if (!_merchantOptionItems.length) {
      const data: any = await services.common.getSystemMerchant();
      if (data) {
        _merchantOptionItems = data?.map((item: any) => ({
          label: item.name,
          value: item.id,
          key: item.currency,
          ...item,
        }));
        setMerchantOptionItems(_merchantOptionItems);
      }
    }
    return firstOption
      ? [firstOption, ..._merchantOptionItems]
      : _merchantOptionItems;
  };

  const getFirstMerchantOption = async () => {
    return _.get(merchantOptionItems, '[0].value', '');
  };

  const getCurrencyOptionItems = async (firstOption: any = System.BaseAll) => {
    let _currencyOptionItems = _.cloneDeep(currencyOptionItems);
    if (!_currencyOptionItems.length) {
      const data: any = await services.common.getSystemCurrency();
      if (data && _.isArray(data)) {
        _currencyOptionItems = data.map((item: any) => ({
          label: `${item.currency} - ${item.currencyName}`,
          value: item.currency,
          key: item.currency,
          ...item,
        }));
      }
      setCurrencyOptionItems(_currencyOptionItems);
    }
    return firstOption
      ? [firstOption, ..._currencyOptionItems]
      : _currencyOptionItems;
  };
  const getFirstCurrencyOption = () => {
    return _.get(currencyOptionItems, '[0].value', '');
  };

  const _getMerchantList = async () => {
    const data = await services.common.getSystemMerchant();
    if (Array.isArray(data)) {
      const result = data.map((item) => ({
        ...item,
        label: item.name,
        value: item.id,
      }));
      setMerchantList(unionWith([System.BaseAll], result));
    }
  };

  const _getCurrencyList = async () => {
    const data = await services.common.getSystemCurrency({ rateType: 1 });
    if (Array.isArray(data)) {
      const result = data.map((item) => ({
        ...item,
        label: `${item.currency} - ${item.currencyName}`,
        value: item.currency,
      }));
      setCurrencyList(unionWith([System.BaseAll], result));
    }
  };

  return {
    merchantList,
    currencyList,
    loadingGlobalDataFinish,
    setLoadingGlobalDataFinish,

    _getMerchantList,
    _getCurrencyList,

    getCurrencyOptionItems,
    getMerchantOptionItems,
    getFirstCurrencyOption,
    getFirstMerchantOption,
  };
};

export default globalModal;
