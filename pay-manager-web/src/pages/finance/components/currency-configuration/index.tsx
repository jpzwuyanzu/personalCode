import services from '@/services';
import { Button, Modal, Input, Select, Tag, message, Checkbox } from 'antd';
import { useEffect, useRef, useState } from 'react';
import common from '@/utils/common';
import { useModel } from '@@/exports';
import {
  ProDescriptions,
  ProForm,
  ProFormCheckbox,
  ProFormRadio,
  ProFormSelect,
} from '@ant-design/pro-components';

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
      <a onClick={() => setIsModalOpen(true)}>币种配置</a>
      <Modal
        title="币种配置"
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
            currencyCodes: record?.currency
              ? record?.currency.split(',').map((item: any) => item)
              : [],
          }}
          onFinish={async (values) => {
            await request({
              id: +record.id,
              currencyCodes: values.currencyCodes,
            });
            message.success('设置成功');
            setIsModalOpen(false);
            props?.reload();
          }}
          onReset={() => {
            formRef.current?.setFieldValue('currencyCodes', []);
          }}
        >
          <ProFormSelect
            request={async () => getCurrencyOptionItems(null)}
            mode="multiple"
            label="支持币种选择"
            name="currencyCodes"
            rules={[
              {
                required: true,
                message: '请选择支持币种',
              },
            ]}
          />
        </ProForm>
      </Modal>
    </>
  );
};
