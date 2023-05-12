import {
  ModalForm,
  ProField,
  ProForm,
  ProFormText,
} from '@ant-design/pro-components';
import { useEffect, useRef, useState } from 'react';
import services from '@/services';
import common from '@/utils/common';
import { message } from 'antd';
import { useModel } from '@@/exports';
import { useAsyncEffect } from 'ahooks';

export default (props: any) => {
  const { visible, setVisible, current } = props;
  const { getMerchantInfo, merchantInfo } = useModel('merchant');
  const [merchantApiData, setMerchantApiData] = useState<any>({
    rechargeNotifyUrl: '',
    exchangeNotifyUrl: '',
  });

  const formRef = useRef<any>();

  useAsyncEffect(async () => {
    if (visible) {
      const { merchantApiInfoVO }: any =
        await services.accountInfo.getPayApiInfo({
          merchantId: merchantInfo.merchantId,
        });
      setMerchantApiData({
        ...merchantApiInfoVO,
      });
      formRef?.current?.setFieldsValue({
        oldRechargeNotifyUrl: merchantApiInfoVO?.rechargeNotifyUrl,
        oldExchangeNotifyUrl: merchantApiInfoVO?.exchangeNotifyUrl,
      });
    }
  }, [visible]);

  return (
    <ModalForm
      className="callback-modal-form"
      title="修改回调地址"
      formRef={formRef}
      open={visible}
      autoFocusFirstInput
      layout="horizontal"
      grid
      modalProps={{
        onCancel: () => setVisible(false),
      }}
      colProps={{ span: 24 }}
      width={800}
      onFinish={async (values) => {
        await services.accountInfo.updateCallbackUrl({
          merchantId: merchantInfo?.merchantId,
          ...values,
        });
        message.success('修改成功');
        setVisible(false);
        return true;
      }}
    >
      <div className="box">
        <div className="title">代收回调</div>
        <ProFormText
          name="oldRechargeNotifyUrl"
          label="当前代收回调地址"
          readonly
        />

        <ProFormText
          name="rechargeNotifyUrl"
          label="新代收回调地址"
          placeholder="输入回调地址"
        />
      </div>
      <div className="box">
        <div className="title">代付回调</div>
        <ProFormText
          name="oldExchangeNotifyUrl"
          label="当前代付回调地址"
          readonly
        />

        <ProFormText
          name="exchangeNotifyUrl"
          label="新代付回调地址"
          placeholder="输入回调地址"
        />
      </div>
    </ModalForm>
  );
};
