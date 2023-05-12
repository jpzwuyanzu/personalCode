import TablePage from '@/components/TablePage';
import { Columns } from '@/types';
import services from '@/services';
import { Button, Modal, Input, Select, Tag, message } from 'antd';
import { useState } from 'react';
import common from '@/utils/common';
import { useModel } from '@@/exports';
import {
  System,
  WithdrawAuditStatusOptions,
  WithdrawExchangeTypeOptions,
} from '@/constants';
import {
  ProDescriptions,
  ProForm,
  ProFormRadio,
  ProFormSelect,
} from '@ant-design/pro-components';
import { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import Status from '@/components/Status';
import { req } from 'pino-std-serializers';

type Props = {
  record: any;
  reload: () => void;
};

export default (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { record } = props;

  return (
    <>
      <a className="text-red" onClick={() => setIsModalOpen(true)}>
        更改状态
      </a>
      <Modal
        className="balance-modal"
        title="更改状态"
        open={isModalOpen}
        footer={null}
        width={600}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <ProForm
          layout="horizontal"
          initialValues={{
            auditStatus: 2,
          }}
          onFinish={async (values) => {
            await services.finance.withdrawApproval.updateStatus({
              id: +record.id,
              auditStatus: values.auditStatus,
            });
            message.success('更改状态成功');
            setIsModalOpen(false);
            props?.reload();
          }}
        >
          <ProForm.Item label="当前状态">
            <Status type="withdraw-approval" val={record?.auditStatus} />
          </ProForm.Item>
          <ProForm.Item
            label="目标状态"
            name="auditStatus"
            rules={[
              {
                required: true,
                message: '请选择目标状态',
              },
            ]}
          >
            <ProFormRadio.Group
              options={[
                {
                  label: '已打款',
                  value: 2,
                },
                {
                  label: '退回',
                  value: 4,
                },
              ]}
            />
          </ProForm.Item>
        </ProForm>
      </Modal>
    </>
  );
};
