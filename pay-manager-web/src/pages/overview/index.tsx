import { useRef, useState } from 'react';
import _, { merge } from 'lodash';
import { Select, Row, Col, Spin, Card, Statistic, Button, Input } from 'antd';
import { useAsyncEffect } from 'ahooks';
import { CreateCard, TablePage, WithButton } from '@/components';
import {
  ProForm,
  ProFormDateRangePicker,
  ProFormDatePicker,
  ProFormText,
} from '@ant-design/pro-components';
import common from '@/utils/common';
import { APP_IS_PAYMENT, System } from '@/constants';
import { Dayjs } from 'dayjs';
import { useModel } from 'umi';
import services from '@/services';
import { ColorEnum } from '@/enums';
import { Carousel } from 'antd';
import {
  DefaultSetting1,
  DefaultSetting2,
  DefaultSetting3,
  StatisticsListType,
  FundList,
  CollectionList,
  PayList,
} from './config';
import { Columns } from '@/types';
import './style.less';
import Notice from '@/pages/overview/notice';

export default () => {
  const rightFormRef = useRef<any>();

  const { merchantList, currencyList } = useModel('global');
  const filterCurrencyList = currencyList.filter(
    (item) => item.value !== System.BaseAll.value,
  );

  const [leftLoading, setLeftLoading] = useState(false);
  const [rightLoading, setRightLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [exportLoading, setExportLoading] = useState(false);

  const [currency, setCurrency] = useState<number | string>('');
  const [merchant, setMerchant] = useState(merchantList[0].value);
  const [rightDate] = useState<Dayjs[]>(
    common.dateUtils.getDateRange(7) as Dayjs[],
  );
  const [listDate] = useState<Dayjs[]>(
    common.dateUtils.getDateRange(7) as Dayjs[],
  );

  const [statisticsDate, setStatisticsDate] = useState('');
  const [leftData, setLeftData] = useState<any>({});
  const [rightData, setRightData] = useState<any>({});

  const getBaseParams = (params = {}) => ({
    currency,
    merchantId: merchant,
    ...params,
  });

  const requestLeft = async () => {
    const data = await services.system.overview.getLeft(getBaseParams());
    setLeftData(data);
    setLeftLoading(false);
  };

  const requestRight = async (arg: any = {}) => {
    setRightLoading(true);
    const params: any = getBaseParams(arg);
    const data = await services.system.overview.getRight(params);
    setRightData(data);
    setRightLoading(false);
    setStatisticsDate(common.dateUtils.formatDateString(Date.now()));
  };

  const requestList = async (params: any = {}) => {
    const { originData } = await services.system.overview.getStatisticeList(
      merge({}, params, getBaseParams()),
    );
    return {
      success: true,
      data: originData,
    };
  };

  const handleExport = async () => {
    setExportLoading(true);
    const data = await services.system.overview.exportStatisticeList({});
    setExportLoading(false);
  };

  const refresh = async () => {
    setLeftLoading(true);
    setRightLoading(true);
    await requestLeft();
    rightFormRef?.current?.submit();
    // await requestRight();
  };

  useAsyncEffect(async () => {
    if (!currency && filterCurrencyList.length) {
      setCurrency(filterCurrencyList[0]?.value);
    }
  }, [filterCurrencyList]);

  useAsyncEffect(async () => {
    if (currency || merchant) {
      await refresh();
    }
  }, [currency, merchant]);

  const RenderExtraLeft = (
    <>
      <Select
        value={currency}
        style={{ width: 180, marginLeft: '10px' }}
        disabled={leftLoading || !filterCurrencyList.length}
        onChange={(val) => setCurrency(val)}
        options={filterCurrencyList}
      />
      {APP_IS_PAYMENT && (
        <Select
          value={merchant}
          disabled={rightLoading}
          style={{ width: 180, marginLeft: '20px' }}
          onChange={(val) => setMerchant(val)}
          options={merchantList}
        />
      )}
    </>
  );

  const RenderExtraRight = <div>统计时间：{statisticsDate || '--'}</div>;

  const BaseItemRender = (data: StatisticsListType[], originData: any) => {
    return data.map((item) => {
      const { label, unit, dataIndex, precision } = item;
      const value = originData[dataIndex] ?? 0;
      return (
        <div key={dataIndex} className="statistic-box">
          <span>{label}</span>
          <Statistic
            value={value}
            suffix={unit}
            precision={precision}
            valueStyle={{
              color: +value >= 0 ? ColorEnum.Green : ColorEnum.Red,
            }}
          />
        </div>
      );
    });
  };

  const SearchForm = (
    <ProForm
      layout="inline"
      onFinish={requestRight}
      initialValues={{
        date: rightDate,
      }}
      formRef={rightFormRef}
    >
      <ProForm.Group>
        <ProFormDateRangePicker
          width="md"
          name={'date'}
          label="日期"
          fieldProps={{
            allowClear: false,
            presets: common.dateUtils.rangePresets,
          }}
          transform={(value) => {
            return {
              beginTime: value[0],
              endTime: value[1],
            };
          }}
        />
      </ProForm.Group>
    </ProForm>
  );

  const RenderHomeStatistics = (
    <Row gutter={16} className="overview">
      <Col {...DefaultSetting1}>
        <Spin spinning={leftLoading}>
          <Card title="资金" bordered className="statistic-card left">
            {BaseItemRender(FundList, leftData)}
          </Card>
        </Spin>
      </Col>
      <Col {...DefaultSetting2}>
        <Card bordered className="statistic-card right" title={SearchForm}>
          <Spin spinning={rightLoading}>
            <Col {...DefaultSetting3}>
              <Card title="代收" bordered className="statistic-card">
                {BaseItemRender(CollectionList, rightData)}
              </Card>
            </Col>
            <Col {...DefaultSetting3}>
              <Card title="代付" bordered className="statistic-card">
                {BaseItemRender(PayList, rightData)}
              </Card>
            </Col>
          </Spin>
        </Card>
      </Col>
    </Row>
  );

  const columns: Columns[] = [
    {
      title: '日期',
      dataIndex: 'date',
      initialValue: listDate,
      valueType: 'dateRange',
      fieldProps: {
        allowClear: false,
        presets: common.dateUtils.rangePresets,
      },
      search: {
        transform: (value) => {
          return {
            beginTime: value[0],
            endTime: value[1],
          };
        },
      },
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '类型',
      dataIndex: 'type',
      fieldProps: {
        allowClear: false,
      },
      initialValue: System.SystemPaymentType[0].value,
      request: System.BaseRequestAsync(System.SystemPaymentType),
      valueType: 'select',
      hideInForm: true,
      hideInTable: true,
    },
    {
      title: '日期',
      dataIndex: 'day',
      valueType: 'date',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '成功金额',
      dataIndex: 'successAmount',
      valueType: 'digit',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '成功笔数',
      dataIndex: 'successNum',
      valueType: 'digit',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '成功率',
      dataIndex: 'successRate',
      valueType: 'percent',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '手续费',
      dataIndex: 'handlingFee',
      valueType: 'digit',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '发起金额',
      dataIndex: 'initiateAmount',
      valueType: 'digit',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '发起笔数',
      dataIndex: 'initiateNum',
      valueType: 'digit',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '人工处理金额',
      dataIndex: 'artificialAmount',
      valueType: 'digit',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '人工处理笔数',
      dataIndex: 'artificialNum',
      valueType: 'digit',
      hideInSearch: true,
      hideInForm: true,
    },
  ];

  return (
    <CreateCard
      moduleTitle={['总览']}
      extraRight={RenderExtraRight}
      extraLeft={RenderExtraLeft}
      loading={leftLoading || rightLoading}
      refreshCallback={refresh}
    >
      <Notice />
      {RenderHomeStatistics}
      <TablePage
        moduleTitle="数据统计"
        columns={columns}
        listRequest={requestList}
        rowKey="day"
        searchConfig={{
          span: { xs: 24, sm: 24, md: 12, lg: 8, xl: 8, xxl: 6 },
          optionRender: (searchConfig, formProps, dom) => [
            ...dom.reverse(),
            <WithButton
              key="export"
              type="primary"
              className="ant-btn-export"
              loading={exportLoading}
              onClick={handleExport}
            >
              导出
            </WithButton>,
          ],
        }}
        scroll={{ x: 1200 }}
      />
    </CreateCard>
  );
};
