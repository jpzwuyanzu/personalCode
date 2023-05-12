import services from '@/services';
import { Button, Modal, Input, Select, Tag, message } from 'antd';
import { useState } from 'react';
import common from '@/utils/common';
import { useModel } from '@@/exports';
import { System, WithdrawExchangeTypeOptions } from '@/constants';
import { ProDescriptions } from '@ant-design/pro-components';
import { ProDescriptionsItemProps } from '@ant-design/pro-descriptions';
import './index.less';

type Props = {
  record: any;
  reload: () => void;
};

export default (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { record } = props;

  const {
    getMerchantOptionItems,
    getCurrencyOptionItems,
    getFirstCurrencyOption,
  } = useModel('global');

  const [exchangeType, setExchangeType] = useState(record?.exchangeType);
  const [remark, setRemark] = useState('');
  const [loading, setLoading] = useState(false);

  const isPendingPayment = record?.auditStatus === 0;

  const exchangeTypeText = WithdrawExchangeTypeOptions.find(
    (item) => item.value === record?.exchangeType,
  )?.label;

  const columns: ProDescriptionsItemProps[] = [
    {
      title: '商户ID',
      dataIndex: 'merchantId',
    },
    {
      title: '提现金额',
      dataIndex: 'amount',
      render: (dom) => <span className="text-red">{dom}</span>,
    },
    {
      title: '商户名称',
      dataIndex: 'merchantName',
    },
    {
      title: '需打款',
      dataIndex: 'realAmount',
      render: (dom) => <span className="text-red">{dom}</span>,
    },
    {
      title: '申请时间',
      dataIndex: 'createTime',
      span: 2,
    },
    {
      title: '',
      dataIndex: 'action',
      span: 2,
      render: (dom, record) => {
        return (
          <table className="descriptions-table">
            <tr>
              <th>提现类型</th>
              <th>{isPendingPayment ? 'USDT地址' : '提现账户'}</th>
              <th>换算系数</th>
              <th>需打款USDT金额</th>
            </tr>
            <tr>
              <td>{exchangeTypeText}</td>
              <td>{record.receiptsAddress}</td>
              <td className="text-red">{record.exchangeRate}</td>
              <td className="text-red">{record.amountUSDT}</td>
            </tr>
          </table>
        );
      },
    },
    {
      title: '打款方式',
      dataIndex: 'exchangeType',
      valueType: 'select',
      span: 2,
      render: (dom) => {
        return isPendingPayment ? (
          <>
            <Select
              options={WithdrawExchangeTypeOptions}
              style={{ width: '100%' }}
              placeholder="请选择打款方式"
              defaultValue={record?.exchangeType}
              onChange={setExchangeType}
            />
          </>
        ) : (
          <span>{exchangeTypeText}</span>
        );
      },
    },
    {
      title: '操作备注',
      dataIndex: 'remark',
      span: 2,
      render: (dom) => {
        return isPendingPayment ? (
          <Input
            placeholder="请输入备注，退回、需填写备注（给客户看）"
            onChange={(e) => setRemark(e.target.value)}
          />
        ) : (
          dom || '-'
        );
      },
    },
  ];

  const label = isPendingPayment ? '待打款' : '查看';
  const labelColor = isPendingPayment ? 'text-orange' : 'text-green';
  const modalTitle = isPendingPayment ? '提现审批打款' : '提现信息审批详情';

  const submit = async (auditStatus: number) => {
    try {
      setLoading(true);
      await services.finance.withdrawApproval.pendingPay({
        id: +record.id,
        auditStatus,
        transferType: exchangeType,
        remark,
      });
      message.success('操作成功');
      setIsModalOpen(false);
      props?.reload();
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <a className={labelColor} onClick={() => setIsModalOpen(true)}>
        {label}
      </a>
      <Modal
        title={modalTitle}
        open={isModalOpen}
        footer={null}
        width={800}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <div className="withdraw-approval-detail-modal">
          <ProDescriptions
            request={async () => {
              return {
                success: true,
                data: record,
              };
            }}
            column={2}
            columns={columns}
          />
          {isPendingPayment && (
            <div className="actions">
              <Button
                loading={loading}
                danger
                type="primary"
                onClick={() => submit(4)}
              >
                退回
              </Button>
              <Button
                loading={loading}
                danger
                type="primary"
                onClick={() => submit(2)}
              >
                打款
              </Button>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};
