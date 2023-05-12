import {
  ModalForm,
  ProForm,
  ProFormCheckbox,
  ProFormDigit,
  ProFormItem,
} from '@ant-design/pro-components';
import { useEffect, useRef, useState } from 'react';
import services from '@/services';
import { BaseModalConfig, System } from '@/constants';
import common from '@/utils/common';
import { ChannelTypeEnum } from '@/enums';
import { useModel } from 'umi';
import { message } from 'antd';
import CheckboxGroup from '@/components/CheckboxGroup';

export default (props: any) => {
  const { visible, setVisible, current, refresh } = props;

  const { merchantList } = useModel('global');

  const merchantItems = merchantList.filter(
    (item: any) => item.value !== System.BaseAll.value,
  );
  const [prevMerchantIds, setPrevMerchantIds] = useState<any>([]);

  useEffect(() => {
    if (visible) {
      setPrevMerchantIds(current?.merchantIds || []);
    } else {
      setPrevMerchantIds([]);
    }
  }, [visible]);

  const formRef = useRef<any>();
  const initialValues: any = {
    merchantIds: current.merchantIds ?? [],
    upRate: current.upRate ?? 0,
    merchantRate: current.merchantRate ?? 0,
    upSingleOrderFee: current.upSingleOrderFee ?? 0,
    merchantSingleOrderFee: current.merchantSingleOrderFee ?? 0,
  };

  return (
    <ModalForm
      title={`通道分配(${current.tunnelName})`}
      formRef={formRef}
      open={visible}
      autoFocusFirstInput
      grid
      modalProps={{
        ...BaseModalConfig,
        onCancel: () => setVisible(false),
      }}
      colProps={{ span: 24 }}
      rowProps={{ gutter: 10 }}
      width={600}
      onFinish={async (values) => {
        values.tunnelId = current.tunnelId;
        values.type = ChannelTypeEnum.Payment;
        // 获取取消选择的商户
        values.cancelMerchantIds = prevMerchantIds.filter((item: any) => {
          return !values.merchantIds.includes(item);
        });
        await services.channel.updateTunnelDistribute(values);
        message.success('操作成功');
        setVisible(false);
        refresh && refresh();
        return true;
      }}
      initialValues={initialValues}
    >
      <div style={{ padding: '10px 0' }}>通道默认费率配置</div>

      <ProForm.Group>
        <ProFormDigit
          name="upRate"
          label="上游费率（%）"
          colProps={{ span: 12 }}
          min={0}
          fieldProps={{ precision: 2 }}
          max={100}
          placeholder="上游默认费率"
          rules={[common.ruleUtils.getRule('required', '请输入上游费率')]}
        />
        <ProFormDigit
          name="upSingleOrderFee"
          label="上游单笔手续费"
          colProps={{ span: 12 }}
          min={0}
          fieldProps={{ precision: 2 }}
          placeholder="上游单笔手续费"
          rules={[common.ruleUtils.getRule('required', '请输入上游单笔手续费')]}
        />
      </ProForm.Group>

      <ProForm.Group>
        {/*<ProFormDigit*/}
        {/*  name="merchantRate"*/}
        {/*  label="商户费率（%）"*/}
        {/*  min={0}*/}
        {/*  colProps={{ span: 12 }}*/}
        {/*  fieldProps={{ precision: 2 }}*/}
        {/*  max={100}*/}
        {/*  placeholder="商户默认费率"*/}
        {/*  rules={[common.ruleUtils.getRule('required', '请输入商户费率')]}*/}
        {/*/>*/}
        <ProFormDigit
          name="merchantSingleOrderFee"
          label="商户单笔手续费"
          min={0}
          colProps={{ span: 24 }}
          fieldProps={{ precision: 2 }}
          placeholder="商户单笔手续费"
          rules={[common.ruleUtils.getRule('required', '请输入商户单笔手续费')]}
        />
      </ProForm.Group>

      <ProFormItem
        name="merchantIds"
        label="分配商户"
        rules={[common.ruleUtils.getRule('required', '请选择分配商户')]}
      >
        <CheckboxGroup options={merchantItems} />
      </ProFormItem>
    </ModalForm>
  );
};
