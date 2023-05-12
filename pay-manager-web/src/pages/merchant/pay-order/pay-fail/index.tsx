import { Button, Modal, Input, Select, Tag } from 'antd';
import { useState } from 'react';
import './index.less';
import Status from '@/components/Status';

type Props = {
  record: any;
};

export default (props: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { record } = props;

  return (
    <>
      <a className="text-red" onClick={() => setIsModalOpen(true)}>
        失败原因
      </a>
      <Modal
        title="失败原因"
        open={isModalOpen}
        footer={null}
        width={600}
        onCancel={() => {
          setIsModalOpen(false);
        }}
      >
        <div className="pay-fail">
          <div className="item">
            <div className="label">平台订单号</div>
            <div className="value">{record?.platformOrderId || '-'}</div>
          </div>
          <div className="item">
            <div className="label">商户订单号</div>
            <div className="value">{record?.merchantOrderId || '-'}</div>
          </div>
          <div className="item">
            <div className="label">通道订单号</div>
            <div className="value">{record?.tunnelOrderId || '-'}</div>
          </div>
          <div className="item">
            <div className="label">状态</div>
            <div className="value">
              <Status type="pay" val={record?.payStatus} />
            </div>
          </div>
          <div className="item">
            <div className="label">失败原因</div>
            <div className="value text-red">{record?.tunnelRemark || '-'}</div>
          </div>
        </div>
      </Modal>
    </>
  );
};
