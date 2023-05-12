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

  // 缓存已选中的商户
  const [prevMerchantIds, setPrevMerchantIds] = useState<any>([]);

  useEffect(() => {
    if (visible) {
      setPrevMerchantIds(current?.merchantIds || []);
    } else {
      setPrevMerchantIds([]);
    }
  }, [visible]);

  const merchantItems = merchantList.filter(
    (item: any) => item.value !== System.BaseAll.value,
  );

  const formRef = useRef<any>();
  const initialValues: any = {
    upRate: current.upRate ?? undefined,
    merchantRate: current.merchantRate ?? undefined,
    merchantIds: current.merchantIds ?? [],
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
        values.type = ChannelTypeEnum.Collect;
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
      <ProFormDigit
        name="upRate"
        label="上游费率（%）"
        min={0}
        fieldProps={{ precision: 2 }}
        max={1000}
        placeholder="设置上游默认配置"
        rules={[common.ruleUtils.getRule('required', '请输入上游费率')]}
      />

      {/*<ProFormDigit*/}
      {/*  name="merchantRate"*/}
      {/*  label="商户费率（%）"*/}
      {/*  min={0}*/}
      {/*  fieldProps={{ precision: 2 }}*/}
      {/*  max={1000}*/}
      {/*  placeholder="设置商户默认配置"*/}
      {/*  rules={[common.ruleUtils.getRule('required', '请输入商户费率')]}*/}
      {/*/>*/}

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
