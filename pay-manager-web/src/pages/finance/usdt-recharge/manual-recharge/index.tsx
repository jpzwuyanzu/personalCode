import services from '@/services';
import {
  Button,
  Modal,
  Input,
  Select,
  Tag,
  message,
  Checkbox,
  Typography,
} from 'antd';
import { useRef, useState } from 'react';
import common from '@/utils/common';
import { useModel } from '@@/exports';
import {
  ModalForm,
  ProDescriptions,
  ProForm,
  ProFormCheckbox,
  ProFormDigit,
  ProFormField,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-components';
import usdt from '@/assets/usdt.png';
import { APP_IS_PAYMENT } from '@/constants';
import './index.less';
import { useAsyncEffect } from 'ahooks';

type Props = {
  reload?: () => void;
  children?: any;
};

export default (props: Props) => {
  const formRef = useRef<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { merchantInfo } = useModel('merchant');
  const [total, setTotal] = useState<any>(0);
  const [amount, setAmount] = useState<any>(0);
  const [address, setAddress] = useState<any>('');
  const [USDTAddress, setUSDTAddress] = useState<any>(''); // usdt地址

  const [currency, setCurrency] = useState<any>('');
  const [currencyItems, setCurrencyItems] = useState<any>([]); // 充值配置的货币列表
  const [currencyRateItemMap, setCurrencyRateItemMap] = useState<any>([]); // 货币汇率map
  const [currencyRate, setCurrencyRate] = useState<any>(0); // 当前货币汇率
  const [rechargeConfig, setRechargeConfig] = useState<any>({
    currency: 'BRL,INR',
    minRecharge: 0,
    maxRecharge: 0,
  }); // 充值配置

  const title = APP_IS_PAYMENT ? '手动充值' : '发起充值';

  useAsyncEffect(async () => {
    // 货币系数
    const data: any =
      await services.finance.withdrawInfoManage.listCurrencyRate({
        rateType: 1,
      });
    const map: any = {};
    data.forEach((item: any) => {
      map[item.currency] = item;
    });
    setCurrencyRateItemMap(map);

    // 充值配置信息

    // 支持的币种列表
    const currencyOptions =
      await services.finance.usdtRecharge.getCurrencyOptions();
    setCurrencyItems(currencyOptions);
  }, []);

  const getUSDTAddress = async (currencyCode: string) => {
    const { address, minRecharge, maxRecharge }: any =
      await services.finance.usdtRecharge.getUSDTAddress({
        currency: currencyCode,
      });

    setUSDTAddress(address);
    setRechargeConfig({
      minRecharge,
      maxRecharge,
    });
  };

  // 变更币种
  useAsyncEffect(async () => {
    if (currency) {
      setCurrencyRate(currencyRateItemMap[currency].currencyRate);
      await getUSDTAddress(currency);
    }
  }, [currency]);

  return (
    <ModalForm
      className="manual-recharge-modal"
      layout="horizontal"
      labelCol={{ span: 6 }}
      formRef={formRef}
      title={title}
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
            {title}
          </Button>
        )
      }
      onFinish={async (formData) => {
        const request = APP_IS_PAYMENT
          ? services.finance.usdtRecharge.recharge
          : services.finance.usdtRecharge.merchantRecharge;

        if (!APP_IS_PAYMENT) {
          formData.merchantId = merchantInfo.merchantId;
          formData.address = USDTAddress;
        }

        await request(formData);
        message.success('操作成功');
        setIsModalOpen(false);
        if (props?.reload) {
          props.reload();
        }
      }}
      modalProps={{
        onCancel: () => setIsModalOpen(false),
        okText: APP_IS_PAYMENT ? '确定' : '提交订单',
      }}
      onValuesChange={(values: any) => {
        if (values.amount) setAmount(values.amount);
        if (values.currency) setCurrency(values.currency);
      }}
    >
      {APP_IS_PAYMENT && (
        <ProFormText
          label="商户ID"
          name="merchantId"
          rules={[common.ruleUtils.getRule('required')]}
          placeholder="请输入商户ID"
        />
      )}

      <ProFormSelect
        label="币种"
        name="currency"
        options={currencyItems}
        rules={[common.ruleUtils.getRule('required')]}
        placeholder="请选择币种"
      />

      <ProFormDigit
        label="充值金额"
        name="amount"
        placeholder={`输入需要充值的金额${
          !APP_IS_PAYMENT
            ? `，最低 ${rechargeConfig.minRecharge}，最高 ${rechargeConfig.maxRecharge}`
            : ''
        }`}
        min={APP_IS_PAYMENT ? 0 : rechargeConfig.minRecharge}
        max={APP_IS_PAYMENT ? null : rechargeConfig.maxRecharge}
        fieldProps={{
          precision: 2,
        }}
        rules={[common.ruleUtils.getRule('notZero')]}
      />

      <ProFormField
        label={APP_IS_PAYMENT ? '支付的金额' : '您需要支付的USDT金额'}
      >
        <div className="usd-computed">
          <div className="usd-computed">
            <span className="border">{amount || 0}</span>
            <span>÷</span>
            <span className="border">{currencyRate}</span>
            <span>=</span>
            <span className="border">
              <img src={usdt} alt="usdt" />
              {amount && currencyRate ? (amount / currencyRate).toFixed(2) : 0}
            </span>
          </div>
        </div>
      </ProFormField>

      {APP_IS_PAYMENT && (
        <ProFormText
          label="备注"
          name="remark"
          rules={[common.ruleUtils.getRule('required')]}
          placeholder="请输入备注"
        />
      )}

      {!APP_IS_PAYMENT && (
        <ProFormField label="收款USDT地址">
          <Typography.Text copyable>{USDTAddress}</Typography.Text>
        </ProFormField>
      )}

      {!APP_IS_PAYMENT && (
        <ProFormText
          label="UTR"
          name="txnId"
          placeholder="请输入UTR凭证"
          rules={[common.ruleUtils.getRule('required')]}
        />
      )}

      <ProFormField>
        {APP_IS_PAYMENT ? (
          <div className="tips">
            <div className="text-red">
              此为商户无法及时提单等特殊情况。可以人工创建订单进行USDT充值
            </div>
          </div>
        ) : (
          <div className="tips">
            <div className="text-red">
              <p>充值步骤：</p>
              <p>1、线下转账对应的USDT数量至收款USDT地址</p>
              <p>2、然后点击【提交订单】等待处理，请勿重复提交</p>
              <p>3、如有疑问，请联系商务</p>
            </div>
            <div className="text-red">
              <p>充值需知：</p>
              <p>1、最低充值 {rechargeConfig.minRecharge}</p>
              <p>2、如有疑问，请联系商务</p>
            </div>
          </div>
        )}
      </ProFormField>
    </ModalForm>
  );
};
