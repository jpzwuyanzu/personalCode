import {
  ModalForm,
  ProForm,
  ProFormDigit,
  ProFormText,
  ProFormMoney,
  ProFormItem,
  ProFormGroup,
  ProFormSelect,
} from '@ant-design/pro-components';
import services from '@/services';
import {
  Button,
  Modal,
  Input,
  Select,
  Tag,
  Typography,
  message,
  InputNumber,
} from 'antd';
import { useRef, useState } from 'react';

type Props = {
  record: any;
  currency: string;
  reload: () => void;
};

enum balanceType {
  availableBalance = 'availableBalance',
  unsettledBalance = 'unsettledBalance',
  freezeBalance = 'freezeBalance',
}

export default (props: Props) => {
  const formRef = useRef<any>();
  const { record, currency } = props;

  const [keywordType, setKeywordType] = useState<balanceType>(
    balanceType.availableBalance,
  );
  const [keyword, setKeyword] = useState('');
  const placeholderMap = {
    availableBalance: '正数增加、负数减少',
    unsettledBalance: '正数为增加、负数为减少',
    freezeBalance: '正数为冻结未结算余额、负数为解冻',
  };

  return (
    <ModalForm
      formRef={formRef}
      title="修改余额"
      trigger={<a>修改余额</a>}
      layout="horizontal"
      labelCol={{ span: 4 }}
      modalProps={{
        onCancel: () => {
          formRef.current?.resetFields();
        },
      }}
      onFinish={async (formData) => {
        formData.currency = currency;
        formData.id = record.id;
        formData[keywordType] = keyword;
        await services.merchant.manage.changeBalance(formData);
        message.success('修改成功');
        props?.reload();
        return true;
      }}
      initialValues={{
        availableBalance: '',
        unsettledBalance: '',
        payBalance: '',
        remark: '',
      }}
    >
      {/*<ProFormItem label="当前币种">{currency}</ProFormItem>*/}

      <ProFormItem label="可用余额">{record?.availableBalance}</ProFormItem>

      <ProFormItem label="未结算余额">{record?.unsettledBalance}</ProFormItem>

      <ProFormItem label="代付余额">{record?.payBalance}</ProFormItem>

      <ProFormItem>
        <Input.Group compact>
          <Select
            defaultValue={balanceType.availableBalance}
            style={{ width: '140px' }}
            onChange={setKeywordType}
          >
            <Select.Option value={balanceType.availableBalance}>
              修改可用余额
            </Select.Option>
            <Select.Option value={balanceType.unsettledBalance}>
              修改未结算余额
            </Select.Option>
            <Select.Option value={balanceType.freezeBalance}>
              修改冻结余额
            </Select.Option>
          </Select>
          <InputNumber
            style={{ width: 'calc(100% - 140px)' }}
            value={keyword}
            placeholder={placeholderMap[keywordType]}
            onChange={(value: any) => {
              setKeyword(value);
            }}
          />
        </Input.Group>
      </ProFormItem>

      <ProFormDigit
        name="payBalance"
        label="修改代付余额"
        placeholder="正数增加、负数减少"
        min={-9999999999}
      />

      <ProFormText name="remark" label="备注" />
    </ModalForm>
  );
};
