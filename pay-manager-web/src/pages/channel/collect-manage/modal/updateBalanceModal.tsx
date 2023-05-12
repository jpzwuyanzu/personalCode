import {
  ModalForm,
  ProForm,
  ProFormText,
  ProFormTextArea,
  ProFormDigit,
} from '@ant-design/pro-components';
import { useRef } from 'react';
import services from '@/services';
import { BaseModalConfig } from '@/constants';
import common from '@/utils/common';
import { ChannelTypeEnum } from '@/enums';
import { message } from 'antd';

export default (props: any) => {
  const { visible, setVisible, current, refresh } = props;

  const formRef = useRef<any>();
  const initialValues: any = {
    tunnelId: current.tunnelId,
    originBalance: current.balance ?? 0,
  };

  return (
    <ModalForm
      title={`修改余额(${current.tunnelName})`}
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
        values.currency = current.currency;
        await services.channel.updateTunnelBalance(values);
        message.success('操作成功');
        setVisible(false);
        refresh && refresh();
        return true;
      }}
      initialValues={initialValues}
    >
      <ProForm.Group>
        <ProFormText
          name="originBalance"
          label="通道余额"
          placeholder=""
          disabled
        />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormDigit
          name="balance"
          label="修改通道余额"
          placeholder="正数增加，负数减少"
          min={
            initialValues.originBalance && initialValues.originBalance > 0
              ? -initialValues.originBalance
              : 0
          }
          max={10e8}
          fieldProps={{ precision: 2 }}
          rules={[
            common.ruleUtils.getRule('required', '请输入金额'),
            common.ruleUtils.getRule('validator', '', {
              validator: (rule, value, callback) => {
                if (![null, undefined, ''].includes(value) && +value === 0) {
                  return callback('请输入不为0的数字');
                }
                return callback();
              },
            }),
          ]}
        />
      </ProForm.Group>
      {/* <ProForm.Group>
        <ProFormTextArea
          name="remark"
          label="备注"
          placeholder="请输入备注"
          fieldProps={{ maxLength: 1000 }}
          rules={[common.ruleUtils.getRule('required', '请输入备注')]}
        />
      </ProForm.Group> */}
    </ModalForm>
  );
};
