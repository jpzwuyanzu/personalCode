import { Table } from 'antd';
import { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { useAsyncEffect } from 'ahooks';
import services from '@/services';
import _ from 'lodash';

type Props = {
  columns: any;
  params: any;
  isSingleMerchant: boolean;
  isEdit: boolean;
  tableChangeData: any;
  onRequestData?: (data: any) => void;
};

export default forwardRef((props: Props, ref) => {
  const {
    columns,
    params,
    tableChangeData,
    isSingleMerchant,
    isEdit,
    onRequestData,
  } = props;

  const [dataSource, setDataSource] = useState<any[]>([]);
  const [tunnelList, setTunnelList] = useState<any[]>([]);
  const [merchantTunnelList, setMerchantTunnelList] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const newData = dataSource.map((item) => {
      const changeItem = tableChangeData[item.tunnelId];
      if (changeItem) {
        return {
          ...item,
          ...changeItem,
        };
      }
      return item;
    });
    // setDataSource(newData);
    console.log(`newData`, newData);
  }, [tableChangeData]);

  const getData = async () => {
    try {
      setLoading(true);
      const {
        configTunnelList = [],
        merchantTunnelResultsVOS = [],
        merchantManageVO = {},
      }: any = await services.merchant.manage.findAllConfigTunnel(params);

      if (_.isArray(merchantTunnelResultsVOS)) {
        merchantTunnelResultsVOS.forEach((item: any) => {
          item.status = item.merchantTunnelStatus;
        });
      }

      setTunnelList(configTunnelList);
      setMerchantTunnelList(merchantTunnelResultsVOS);
      setDataSource(
        isSingleMerchant ? merchantTunnelResultsVOS : configTunnelList,
      );
      // 回传数据给父级
      onRequestData?.({ merchantManageVO });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isEdit) {
      const mergeTunnelList = tunnelList.map((item) => {
        const merchantItem = merchantTunnelList.find(
          (merchantItem) => merchantItem.tunnelId === item.tunnelId,
        );
        return {
          ...item,
          ...merchantItem,
          status: merchantItem?.status,
        };
      });
      setDataSource(() => [...mergeTunnelList]);
    } else {
      setDataSource(() => [...merchantTunnelList]);
    }
  }, [isEdit]);

  const changeData = (data: any) => {
    const newData = dataSource.map((item) => {
      if (item.tunnelId === data.tunnelId) {
        return {
          ...item,
          ...data,
        };
      }
      return item;
    });
    setDataSource(newData);
  };

  useAsyncEffect(async () => {
    if (params.currency) {
      await getData();
    }
  }, [params.currency]);

  useImperativeHandle(ref, () => ({
    reload: getData,
    changeData,
  }));

  return (
    <>
      <Table
        rowKey={'tunnelId'}
        dataSource={dataSource}
        columns={columns}
        loading={!dataSource.length && loading}
        pagination={false}
      />
    </>
  );
});
