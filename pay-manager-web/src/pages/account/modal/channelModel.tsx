import services from '@/services';
import { message, Modal, Tabs, Tag } from 'antd';
import TablePage from '@/components/TablePage';
import {ProTable} from "@ant-design/pro-components";
import { Columns } from '@/types';
import { useModel } from 'umi';
import { useRef, useState } from 'react';
import common from '@/utils/common';
import { Channel } from '@/constants';
import {CodeEnum} from "@/enums";
import _ from "lodash";
import {useAsyncEffect} from "ahooks";

export default (props: any) => {
  const { merchantInfo } = useModel('merchant');
  const { getCurrencyOptionItems, getFirstCurrencyOption } = useModel('global');
  const { visible, setVisible } = props;
  const [tab, setTab] = useState('collect');
  const [dataSource, setDataSource] = useState<any[]>([]);
  const collectTableRef = useRef<any>();
  const payTableRef = useRef<any>();

  useAsyncEffect(async () => {
    if (visible) {
      await getChannelList();
    }
  }, [visible])

  const getChannelList = async () => {
    const data: any[] = await services.accountInfo.getChannelList({merchantId: merchantInfo.merchantId})
    setDataSource(data || [])
  };

  const collectColumns: any[] = [
    {
      title: '通道币种',
      dataIndex: 'currency',
      valueType: 'select',
      hideInSearch: true,
      initialValue: getFirstCurrencyOption(),
      request: () => getCurrencyOptionItems(null),
      fieldProps: {
        allowClear: false,
      },
      align: 'center',
      width: 300
    },
    {
      title: '费率',
      dataIndex: 'exchangeFeeRate',
      hideInSearch: true,
      render: (text: any) => `${text}%`,
      align: 'center',
    },
  ];

  const payColumns: any[] = [
    {
      title: '通道币种',
      dataIndex: 'currency',
      valueType: 'select',
      hideInSearch: true,
      initialValue: getFirstCurrencyOption(),
      request: () => getCurrencyOptionItems(null),
      fieldProps: {
        allowClear: false,
      },
      align: 'center',
      width: 300
    },
    {
      title: '费率',
      dataIndex: 'exchangeFeeRate',
      hideInSearch: true,
      render: (text: any) => `${text}%`,
      align: 'center',
    },
    {
      title: '单笔手续费',
      dataIndex: 'exchangeSingleFee',
      hideInSearch: true,
      align: 'center',
    },
  ];

  // useEffect(() => {
  //   if (tab === 'collect') {
  //     collectTableRef?.current?.reload();
  //   } else {
  //     payTableRef?.current?.reload();
  //   }
  // }, [tab]);

  const collectTable = (
    <div className="modal-table">
      <ProTable
        rowKey={'currency'}
        columns={collectColumns}
        dataSource={dataSource}
        pagination={false}
        search={false}
        options={false}
      />
      {/*<TablePage*/}
      {/*  rowKey={'currency'}*/}
      {/*  tableRef={collectTableRef}*/}
      {/*  cardBordered={{*/}
      {/*    search: true,*/}
      {/*    table: false,*/}
      {/*  }}*/}
      {/*  hiddenToolBar*/}
      {/*  listRequest={(params) => {*/}
      {/*    // params.type = 1;*/}
      {/*    params.merchantId = merchantInfo.merchantId;*/}
      {/*    return services.accountInfo.getChannelList(params);*/}
      {/*  }}*/}
      {/*  pageSize={10}*/}
      {/*  columns={collectColumns}*/}
      {/*/>*/}
    </div>
  );

  const payTable = (
    <div className="modal-table">
      <ProTable
        rowKey={'currency'}
        columns={payColumns}
        dataSource={dataSource}
        pagination={false}
        search={false}
        options={false}
      />
      {/*<TablePage*/}
      {/*  tableRef={payTableRef}*/}
      {/*  cardBordered={{*/}
      {/*    search: true,*/}
      {/*    table: false,*/}
      {/*  }}*/}
      {/*  hiddenToolBar*/}
      {/*  listRequest={(params) => {*/}
      {/*    // params.type = 2;*/}
      {/*    params.merchantId = merchantInfo.merchantId;*/}
      {/*    return services.accountInfo.getChannelList(params);*/}
      {/*  }}*/}
      {/*  pageSize={10}*/}
      {/*  columns={payColumns}*/}
      {/*/>*/}
    </div>
  );

  const items = [
    {
      label: '代收通道',
      key: 'collect',
    },
    {
      label: '代付通道',
      key: 'pay',
    },
  ];

  return (
    <Modal
      className="channel-fee-modal"
      title="我的信息"
      open={visible}
      width={700}
      footer={null}
      onCancel={() => {
        setVisible(false);
      }}
    >
      <div className="tabs-wrap">
        <Tabs
          type="card"
          defaultActiveKey="collect"
          items={items}
          onChange={setTab}
        />
        <div className="tabs-content">
          {tab === 'collect' ? collectTable : payTable}
        </div>
      </div>
    </Modal>
  );
};
