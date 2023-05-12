import services from '@/services';
import { Button, Modal, Input, Select, Tag, message, Checkbox } from 'antd';
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
} from '@ant-design/pro-components';
import { useAsyncEffect } from 'ahooks';

type Props = {
  rateType: number;
  configId?: number;
  triggerType?: 'link';
};

export default (props: Props) => {
  const formRef = useRef<any>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currencyItems, setCurrencyItems] = useState<any[]>([]);

  const { rateType, configId, triggerType } = props;

  useAsyncEffect(async () => {
    if (isModalOpen) {
      const params: any = { rateType };
      if (configId !== undefined) {
        params.configId = configId;
      }
      const data: any =
        await services.finance.withdrawInfoManage.listCurrencyRate(params);
      setCurrencyItems(data);
    } else {
      setCurrencyItems([]);
    }
  }, [isModalOpen]);

  const onValuesChange = () => {
    const values = formRef.current.getFieldsValue();
    for (const key in values) {
      if (!values[key]) {
        formRef.current.setFieldValue(key, 1);
      }
    }
  };

  const title = rateType === 1 ? '充值货币系数配置' : '提现货币系数配置';

  return (
    <ModalForm
      layout="horizontal"
      formRef={formRef}
      title={title}
      open={isModalOpen}
      grid
      width={600}
      trigger={
        triggerType === 'link' ? (
          <a onClick={() => setIsModalOpen(true)}>货币系数配置</a>
        ) : (
          <Button onClick={() => setIsModalOpen(true)}>货币系数配置</Button>
        )
      }
      onFinish={async (formData) => {
        const _formData = Object.keys(formData).map((key) => {
          const findItem = currencyItems.find((item) => item.currency === key);
          const result: Record<string, string | number> = {
            ...findItem,
            currencyRate: formData[key] || 1,
            rateType,
          };
          if (configId !== undefined) {
            result.configId = configId;
          }
          return result;
        });
        await services.finance.withdrawInfoManage.updateCurrencyRate(_formData);
        message.success('配置成功');
        setIsModalOpen(false);
      }}
      modalProps={{
        destroyOnClose: true,
        onCancel: () => setIsModalOpen(false),
      }}
      onValuesChange={onValuesChange}
    >
      <ProFormField>
        <div>货币筹码系数：1USDT=？货币</div>
      </ProFormField>

      {currencyItems.map((item) => {
        return (
          <ProFormDigit
            colProps={{ span: 11, offset: 1 }}
            key={item.currency}
            name={item.currency}
            label={item.currency}
            initialValue={item.currencyRate}
            placeholder={item.currencyName}
            fieldProps={{
              min: 0,
              max: 100,
              precision: 5,
            }}
          />
        );
      })}

      <ProFormField>
        <div className="text-red">
          支持小数点后5位，如18.00000，则表示支付U金额=充值货币金额/18.00000；不填则默认为1.00000
        </div>
      </ProFormField>
    </ModalForm>
  );
};
