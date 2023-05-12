import services from '@/services';
import { Button, Modal, Input, Select, Tag, message, Checkbox } from 'antd';
import { useRef, useState } from 'react';
import { useModel } from '@@/exports';
import { ProForm, ProFormSelect } from '@ant-design/pro-components';
import common from '@/utils/common';

type Props = {
  record: any;
  request: (params: any) => Promise<any>;
  reload: () => void;
};

export default (props: Props) => {
  const {
    getMerchantOptionItems,
    getCurrencyOptionItems,
    getFirstCurrencyOption,
  } = useModel('global');

  const formRef = useRef<any>();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const { record, request } = props;

  return (
    <>
      <a onClick={() => setIsModalOpen(true)}>商户配置</a>
      <Modal
        title="商户配置"
        open={isModalOpen}
        footer={null}
        width={600}
        destroyOnClose
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <ProForm
          formRef={formRef}
          initialValues={{
            merchantIds: record?.merchants
              ? record?.merchants.split(',').map((item: any) => +item)
              : [],
          }}
          onFinish={async (values) => {
            await request({
              id: +record.id,
              merchantIds: values.merchantIds,
            });
            message.success('设置成功');
            setIsModalOpen(false);
            props?.reload();
          }}
          onReset={() => {
            formRef.current?.setFieldValue('merchantIds', []);
          }}
        >
          <ProFormSelect
            request={async () => getMerchantOptionItems(null)}
            mode="multiple"
            label="选择商户"
            name="merchantIds"
            rules={[common.ruleUtils.getRule('required', '请选择商户')]}
          />
        </ProForm>
      </Modal>
    </>
  );
};
