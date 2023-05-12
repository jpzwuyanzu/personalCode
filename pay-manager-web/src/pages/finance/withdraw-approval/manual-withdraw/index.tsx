import services from '@/services';
import { Button, Modal, Input, Select, Tag, message, Checkbox } from 'antd';
import { useEffect, useRef, useState } from 'react';
import common from '@/utils/common';
import { useModel } from '@@/exports';
import {
  ModalForm,
  ProDescriptions,
  ProForm,
  ProFormCheckbox,
  ProFormDigit,
  ProFormField,
  ProFormGroup,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import usdt from '@/assets/usdt.png';
import './index.less';
import { APP_IS_PAYMENT } from '@/constants';
import { useAsyncEffect } from 'ahooks';
import rechargeInfoManage from '@/services/finance/recharge-info-manage';
import _ from 'lodash';

type Props = {
  reload?: () => void;
  children?: any;
};

export default (props: Props) => {
  const formRef = useRef<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getCurrencyOptionItems } = useModel('global');
  const { merchantInfo } = useModel('merchant');

  const [amount, setAmount] = useState<any>(0);

  const [currencyItems, setCurrencyItems] = useState<any>([]); // 提现配置的货币列表
  const [currency, setCurrency] = useState<any>('');
  const [currencyRateItemMap, setCurrencyRateItemMap] = useState<any>([]); // 货币汇率map
  const [currencyRate, setCurrencyRate] = useState<any>(0); // 当前货币汇率
  const [USDTAddress, setUSDTAddress] = useState<any>(''); // usdt提现地址
  const [withdrawConfig, setWithdrawConfig] = useState<any>({
    dayWithdrawCount: 0,
    minAmountOne: 0,
    maxAmountOne: 0,
  }); // 提现配置
  const [availableBalance, setAvailableBalance] = useState<any>(0); // 可用余额

  const [conversionFee, setConversionFee] = useState<any>(0); // 转换手续费

  const [balance, setBalance] = useState<any>(0); // 币种余额
  const [balanceMap, setBalanceMap] = useState<any>({}); // 币种余额map

  useAsyncEffect(async () => {
    if (isModalOpen) {
      const data: any =
        await services.finance.withdrawInfoManage.listCurrencyRate({
          rateType: 2,
        });
      const _currencyRateItemMap: any = {};
      data.forEach((item: any) => {
        _currencyRateItemMap[item.currency] = item;
      });
      setCurrencyRateItemMap(_currencyRateItemMap);

      const result: any =
        await services.finance.withdrawInfoManage.getStrategy();
      const withdrawConfigItems: any =
        await services.finance.withdrawInfoManage.list({});
      // 临时写死
      const withdrawTypeConfig = withdrawConfigItems?.[0];

      setWithdrawConfig({
        ...result,
        ...withdrawTypeConfig,
      });

      const _balanceMap: any =
        await services.finance.withdrawInfoManage.getBalanceMap({
          id: merchantInfo?.merchantId,
        });
      setBalanceMap(_balanceMap);

      const withdrawTypeCurrency = withdrawTypeConfig.currency.split(',');
      const currencyOptions = await getCurrencyOptionItems(null);
      const filterItems = currencyOptions.filter((item: any) => {
        return withdrawTypeConfig.currency.split(',').includes(item.value);
      });

      const currency = filterItems[0]?.value;

      setCurrency(currency);
      formRef.current?.setFieldsValue({
        currency,
      });

      const _currencyRate = _currencyRateItemMap[currency]?.currencyRate;
      const _conversionFee = _.ceil(
        (1 + (withdrawConfig?.handlingFee || 0) / 100) * _currencyRate || 0,
        2,
      );
      setConversionFee(_conversionFee);
      setCurrencyItems(filterItems);
      setAvailableBalance(
        _.ceil(balanceMap?.[currency]?.availableBalance || 0, 2),
      );
    }
  }, [isModalOpen]);

  const getUSDTAddress = async () => {
    const merchantData: any = await services.accountInfo.getAccountInfo();
    setUSDTAddress(merchantData?.usdt);
  };

  useAsyncEffect(async () => {
    await getUSDTAddress();
  }, []);

  // 变更币种
  useAsyncEffect(async () => {
    if (currency) {
      setAvailableBalance(
        _.ceil(balanceMap?.[currency]?.availableBalance || 0, 2),
      );
      const _currencyRate = currencyRateItemMap[currency]?.currencyRate;
      setCurrencyRate(_currencyRate);
      setConversionFee(
        _.ceil(
          (1 + (withdrawConfig?.handlingFee || 0) / 100) * _currencyRate || 0,
          2,
        ),
      );
    }
  }, [currency]);

  return (
    <ModalForm
      className="manual-withdraw-modal"
      layout="horizontal"
      labelCol={{ span: 6 }}
      formRef={formRef}
      title={'发起提现'}
      open={isModalOpen}
      onOpenChange={(open) => {
        if (open) {
          setIsModalOpen(true);
        }
      }}
      width={700}
      trigger={
        props?.children || (
          <Button type="primary" onClick={() => setIsModalOpen(true)}>
            发起提现
          </Button>
        )
      }
      onFinish={async (formData) => {
        formData.merchantId = merchantInfo.merchantId;
        await services.finance.withdrawApproval.withdraw(formData);
        message.success('操作成功');
        setIsModalOpen(false);
        if (props?.reload) {
          props.reload();
        }
      }}
      modalProps={{
        onCancel: () => {
          setIsModalOpen(false);
          formRef.current?.resetFields();
          setBalance(0);
        },
        okText: APP_IS_PAYMENT ? '确定' : '提交订单',
      }}
      onValuesChange={(values: any) => {
        if (values.amount) setAmount(values.amount);
        if (values.currency) setCurrency(values.currency);
      }}
    >
      <ProFormSelect
        label="币种"
        name="currency"
        options={currencyItems}
        rules={[common.ruleUtils.getRule('required')]}
      />

      <ProFormField label="可用余额">
        <span>{availableBalance}</span>
      </ProFormField>

      <ProFormDigit
        label="提现金额"
        name="amount"
        min={_.ceil(withdrawConfig?.minAmountOne * conversionFee)}
        max={_.ceil(withdrawConfig?.maxAmountOne * conversionFee)}
        placeholder={`输入提现金额，最低 ${_.ceil(
          withdrawConfig?.minAmountOne * conversionFee,
        )}，最高 ${_.ceil(withdrawConfig?.maxAmountOne * conversionFee)}`}
        rules={[common.ruleUtils.getRule('required')]}
      />

      <ProFormField label="预计到账的USDT金额">
        <div className="usd-computed">
          <span className="border">{amount || 0}</span>
          <span>÷</span>
          <span className="border">
            <span>{conversionFee}</span>
          </span>
          <span>=</span>
          <span className="border">
            <img src={usdt} alt="usdt" />
            {amount && currencyRate ? (amount / conversionFee).toFixed(2) : 0}
          </span>
        </div>
      </ProFormField>

      <ProFormField label="您的收款USDT地址">
        <span>{USDTAddress || '未设置'}</span>
      </ProFormField>

      <ProFormText
        label="谷歌验证码"
        name="gaCode"
        rules={[common.ruleUtils.getRule('required')]}
      />

      <ProFormText
        label="支付密码"
        name="payPassword"
        rules={[common.ruleUtils.getRule('required')]}
      />

      <ProFormField>
        <div className="tips">
          <div className="text-red">
            <p>提现步骤：</p>
            <p>1、提交提现订单</p>
            <p>2、等待财务处理</p>
            <p>3、如有疑问，请联系商务</p>
          </div>
          <div className="text-red">
            <p>提现需知：</p>
            <p>
              1、单笔提现USDT额度：{withdrawConfig?.minAmountOne}-
              {withdrawConfig?.maxAmountOne}
            </p>
            <p>2、每日提现次数：{withdrawConfig?.dayWithdrawCount || '-'}</p>
            <p>3、如有疑问，请联系商务</p>
          </div>
        </div>
      </ProFormField>
    </ModalForm>
  );
};
