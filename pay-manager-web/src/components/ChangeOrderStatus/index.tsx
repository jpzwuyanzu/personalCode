import {
  ModalForm,
  ProFormItem,
  ProFormSelect,
} from '@ant-design/pro-components';
import services from '@/services';
import { message } from 'antd';
import { PayStatusOptions } from '@/constants';

type Props = {
  record: any;
  reload: () => void;
  request: (params: any) => Promise<any>;
};

export default (props: Props) => {
  const { record, request } = props;

  const payStatusMap: any = {};
  PayStatusOptions.forEach((item) => {
    payStatusMap[item.value] = item.label;
  });

  return (
    <ModalForm
      title="修改支付状态"
      trigger={<a>修改支付状态</a>}
      layout="horizontal"
      labelCol={{ span: 4 }}
      onFinish={async (formData) => {
        formData.platformOrderId = record.platformOrderId;
        formData.merchantId = record.merchantId;
        await request(formData);
        message.success('修改成功');
        props?.reload();
        return true;
      }}
    >
      <ProFormItem label="当前状态">
        {payStatusMap[record?.payStatus] || record?.payStatus}
      </ProFormItem>

      <ProFormSelect
        name="payStatus"
        label="修改支付状态"
        initialValue={1}
        options={PayStatusOptions.filter(
          (item) => item.value !== record?.payStatus,
        )}
      />
    </ModalForm>
  );
};
