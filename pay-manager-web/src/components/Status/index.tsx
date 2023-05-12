import {
  CallbackStatusOptions,
  PayStatusOptions,
  WithdrawAuditStatusOptions,
} from '@/constants';

enum Status {
  pay = 'pay',
  callback = 'callback',
  withdrawApproval = 'withdraw-approval',
}

type Props = {
  type: 'pay' | 'callback' | 'withdraw-approval';
  val: number | string;
};

const statusMap: any = {};

const statusOptions: any = {
  [Status.pay]: PayStatusOptions,
  [Status.callback]: CallbackStatusOptions,
  [Status.withdrawApproval]: WithdrawAuditStatusOptions,
};

Object.keys(statusOptions).forEach((key) => {
  statusMap[key] = {};
  statusOptions[key].forEach((item: any) => {
    statusMap[key][item.value] = item;
  });
});

export default (props: Props) => {
  const statusItem = statusMap?.[props.type]?.[props.val];
  return (
    <span style={{ color: statusItem?.color || 'inherit' }}>
      {statusItem?.label}
    </span>
  );
};
