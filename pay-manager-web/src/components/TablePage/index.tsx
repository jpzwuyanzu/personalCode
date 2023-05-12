import React, {
  useEffect,
  useRef,
  useState,
  forwardRef,
  useImperativeHandle,
} from 'react';
import { Columns, FormType, RowActionType } from '@/types';
import { Button, message, Modal, Popconfirm } from 'antd';
import FormModal from './form-modal';
import { WithLink } from '@/components';
import {
  ProColumns,
  ProFormInstance,
  ProTable,
} from '@ant-design/pro-components';
import { BaseQueryFilterProps } from '@ant-design/pro-form/es/layouts/QueryFilter';
import { Bordered } from '@ant-design/pro-table/es/typing';
import { ToolBarProps } from '@ant-design/pro-table/es/components/ToolBar';
import type { TableProps as RcTableProps } from 'rc-table/lib/Table';
import dayjs, { Dayjs } from 'dayjs';
import { LoadingOutlined, ReloadOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { SearchConfig } from '@ant-design/pro-table/es/components/Form/FormRender';
import { BaseModalConfig } from '@/constants';
import services from '@/services';

interface AuthConfig {
  addAuth?: boolean;
  editAuth?: boolean;
  delAuth?: boolean;
  statusAuth?: boolean;
}

type Props = {
  moduleTitle?: string | React.ReactNode; // 模块名称
  moduleName?: string; // 模块名称
  editNameKey?: string; // 修改时对应数据的名称
  columns: Columns[]; // 字段配置
  listRequest: (params: any, sort: any, filter: any) => Promise<any>; // 列表请求
  beforeRequestFormat?: (params: any) => Record<string, any>; // 请求之前的数据处理
  addRequest?: (params: any) => Promise<any>; // 创建请求
  detailRequest?: (params: any) => Promise<any>; // 详情请求
  editRequest?: (params: any) => Promise<any>; // 更新请求
  delRequest?: (params: any) => Promise<any>; // 删除请求
  changeStatusRequest?: (params: any) => Promise<any>; // 变更状态请求
  exportRequest?: (params: any) => Promise<any>; // 导出请求
  actions?: (record?: any) => React.ReactNode[]; // 操作按钮
  actionsWidth?: number; // 操作按钮宽带
  searchConfig?: SearchConfig; // 搜索区配置
  searchFormRef?: React.MutableRefObject<ProFormInstance> | any; // 搜索表单ref
  toolBarActions?: (action: any) => React.ReactNode[]; // 工具栏操作按钮
  cardBordered?: Bordered; // 卡片边框
  scroll?: {
    scrollToFirstRowOnChange?: boolean;
    x?: number | string;
    y?: number;
  };
  hiddenToolBar?: boolean; // 隐藏工具栏
  polling?: number; // 轮询时间
  formWidth?: number; // 弹窗的宽度
  tableRef?: any; // 父级传入ref
  authConfig?: AuthConfig; // 按钮的权限
  pageSize?: number; // 每页条数
  changeStatusMap?: Record<string, string>; // 变更状态的映射
  footer?: (currentPageData: any) => React.ReactNode; // 表格底部
  summary?: (data: any) => React.ReactNode; // 表格合计
  onReset?: () => void; // 重置搜索表单回调
  rowKey?: string; // 表格行key
  onFormValuesChange?: (values: any, formRef: any) => void;
};

const TablePage = (props: Props, ref: React.Ref<unknown> | undefined) => {
  const tableRef = props.tableRef ?? useRef<any>();
  const searchFormRef = props.searchFormRef ?? useRef<any>();
  const formRef = useRef<any>();

  const [polling, setPolling] = useState<any>(undefined);
  const [listRequestTime, setListRequestTime] = useState<string>('');
  const [exportLoading, setExportLoading] = useState<boolean>(false);
  const [dataSource, setDataSource] = useState<any[]>([]);

  useEffect(() => {
    setPolling(props.polling);
  }, [props.polling]);

  useImperativeHandle(ref, () => ({
    updateRow: (rowData: any, rowKey?: string) => {
      const key = rowKey || props.rowKey || 'id';
      // 更新行数据
      const newData = dataSource.map((item) =>
        item[key] === rowData[key] ? rowData : item,
      );
      setDataSource(newData);
    },
  }));

  let {
    moduleTitle = '',
    moduleName = '',
    editNameKey = '',
    beforeRequestFormat = (arg) => arg,
    addRequest,
    delRequest,
    detailRequest,
    editRequest,
    listRequest,
    changeStatusRequest,
    exportRequest,
    actions = () => [],
    actionsWidth = 100,
    toolBarActions = () => [],
    searchConfig = {},
    scroll = {},
    formWidth,
    authConfig,
    pageSize = 20,
    changeStatusMap = { 1: '启用', 2: '禁用' },
    footer,
    summary,
    onReset,
    rowKey = 'id',
    onFormValuesChange,
  } = props;

  if (!moduleName && _.isString(moduleTitle)) {
    moduleName = moduleTitle;
  }

  const showForm = (formData: any) => {
    formRef?.current?.showForm(FormType.EDIT, formData);
  };

  const rowAction = async (type: string, record: any) => {
    let formData: any = { ...record };
    switch (type) {
      case RowActionType.EDIT:
        if (detailRequest) {
          formData = await detailRequest(record);
        }
        showForm(formData);
        break;
      case RowActionType.DELETE:
        Modal.confirm({
          title: '操作确认',
          content: `确定要删除该项吗？`,
          onOk: async () => {
            await delRequest?.(record);
            message.success(`删除成功`);
            tableRef?.current?.reload();
          },
          ...BaseModalConfig,
        });
        break;
      case RowActionType.CHANGE_STATUS:
        Modal.confirm({
          title: '操作确认',
          content: `确定要${
            record.status === 1 ? changeStatusMap[2] : changeStatusMap[1]
          }该${moduleName}吗？`,
          onOk: async () => {
            await changeStatusRequest?.({
              id: record.id,
              status: record.status === 1 ? 2 : 1,
            });
            message.success(`操作成功`);
            tableRef?.current?.reload();
          },
          ...BaseModalConfig,
        });
        break;
    }
  };

  const isEditRequest = editRequest !== undefined;
  const isDelRequest = delRequest !== undefined;
  const isChangeStatusRequest = changeStatusRequest !== undefined;

  const columns: Columns[] = [...props.columns];

  if (
    isEditRequest ||
    isDelRequest ||
    isChangeStatusRequest ||
    actions().length > 0
  ) {
    columns.push({
      title: '操作',
      valueType: 'option',
      className: 'table-action',
      align: 'center',
      fixed: 'right',
      width: actionsWidth,
      render: (text, record) => [
        isEditRequest && (
          <WithLink
            key={RowActionType.EDIT}
            auth={authConfig?.editAuth ?? true}
            onClick={() => rowAction(RowActionType.EDIT, record)}
          >
            编辑
          </WithLink>
        ),
        isDelRequest && (
          <WithLink
            className="text-red"
            key={RowActionType.DELETE}
            onClick={() => rowAction(RowActionType.DELETE, record)}
            auth={authConfig?.delAuth ?? true}
          >
            删除
          </WithLink>
        ),
        ...actions(record),
        isChangeStatusRequest && (
          <WithLink
            className={record.status === 1 ? 'text-red' : 'text-green'}
            auth={authConfig?.statusAuth ?? true}
            key={RowActionType.CHANGE_STATUS + '-auto'}
            onClick={() => rowAction(RowActionType.CHANGE_STATUS, record)}
          >
            {changeStatusMap[record.status === 1 ? 2 : 1]}
          </WithLink>
        ),
      ],
    });
  }

  // 添加默认的组件提示文字
  columns.forEach((item) => {
    let prefix = '请输入';

    if (
      item.valueType === 'select' ||
      item.valueType === 'radio' ||
      item.valueType === 'checkbox' ||
      item.valueType === 'switch' ||
      item.valueType === 'date' ||
      item.valueType === 'dateRange' ||
      item.valueType === 'dateTime' ||
      item.valueType === 'dateTimeRange' ||
      item.valueType === 'time' ||
      item.valueType === 'timeRange' ||
      item.valueType === 'cascader'
    ) {
      prefix = '请选择';
    }

    const fieldProps: any = item.fieldProps || {};
    if (!fieldProps.placeholder) {
      fieldProps.placeholder = `${prefix}${item.title}`;
    }
    item.fieldProps = fieldProps;

    const formItemProps: any = item.formItemProps || {};
    if (!formItemProps.placeholder) {
      formItemProps.placeholder = `${prefix}${item.title}`;
    }
    item.formItemProps = formItemProps;

    if (!item.align) {
      item.align = 'center';
    }
  });

  const isForm = addRequest || editRequest;

  let _addRequest: any = undefined;
  if (addRequest) {
    _addRequest = async (param: any) => {
      return addRequest ? addRequest(beforeRequestFormat(param)) : undefined;
    };
  }

  let _editRequest: any = undefined;
  if (editRequest) {
    _editRequest = async (param: any) => {
      return editRequest ? editRequest(beforeRequestFormat(param)) : undefined;
    };
  }

  const toolBarRender: ToolBarProps<any>['toolBarRender'] | false = (
    action,
  ) => [
    exportRequest && (
      <Button
        key="export"
        className="ant-btn-export"
        loading={exportLoading}
        onClick={async () => {
          if (exportRequest) {
            try {
              setExportLoading(true);
              const searchParams: any =
                searchFormRef?.current?.getFieldsFormatValue();
              await exportRequest(searchParams);
              message.success('导出成功');
            } catch (e) {
              message.error('导出失败');
            } finally {
              setExportLoading(false);
            }
          }
        }}
      >
        导出
      </Button>
    ),
    ...toolBarActions(action),
    isForm && (
      <FormModal
        moduleName={moduleName}
        editNameKey={editNameKey}
        addRequest={_addRequest}
        editRequest={_editRequest}
        key="form"
        columns={columns}
        tableRef={tableRef}
        ref={formRef}
        formWidth={formWidth}
        addAuth={authConfig?.addAuth}
        onFormValuesChange={onFormValuesChange}
      />
    ),
    (props?.polling || 0) > 0 && (
      <Button
        key="polling"
        type="primary"
        onClick={() => {
          if (polling) {
            setPolling(undefined);
            return;
          }
          setPolling(props?.polling || 5000);
        }}
      >
        {polling ? <LoadingOutlined /> : <ReloadOutlined />}
        {polling ? '停止自动刷新' : '自动刷新'}
      </Button>
    ),
  ];

  const search: SearchConfig = {
    filterType: 'query',
    span: { xs: 24, sm: 24, md: 12, lg: 8, xl: 8, xxl: 4 },
    searchGutter: 10,
    showHiddenNum: true,
    defaultCollapsed: false,
    collapsed: false,
    labelWidth: 'auto',
    collapseRender: () => null,
    ...(searchConfig || {}),
  };

  let cardBordered: Bordered = {
    search: true,
    table: true,
  };

  if (props.cardBordered !== undefined) {
    cardBordered = props.cardBordered;
  }

  let className = '';
  if (props.hiddenToolBar) {
    className = 'hidden-tool-bar';
  }

  // 轮询
  if (polling) {
    moduleTitle = (
      <span className="polling-module-title">
        <span>{moduleTitle}</span>
        <span className="last-update-time">
          最后更新时间：{listRequestTime}
        </span>
      </span>
    );
  }

  return (
    <>
      <ProTable<Record<string, any>, any>
        dataSource={dataSource}
        className={className}
        headerTitle={moduleTitle}
        actionRef={tableRef}
        columns={columns}
        request={async (params, sort, filter) => {
          const response: any = await listRequest(params, sort, filter);
          setDataSource(response?.data || []);
          return response;
        }}
        onLoad={() => {
          if (polling) {
            setListRequestTime(dayjs().format('YYYY-MM-DD HH:mm:ss'));
          }
        }}
        rowKey={rowKey}
        cardBordered={cardBordered}
        search={search}
        formRef={searchFormRef}
        scroll={scroll}
        footer={footer}
        summary={summary}
        pagination={{
          position: ['bottomCenter'],
          showQuickJumper: true,
          size: 'default',
          defaultPageSize: pageSize,
          showSizeChanger: true,
        }}
        toolBarRender={toolBarRender}
        polling={polling || undefined}
        onReset={onReset}
      />
    </>
  );
};

export default forwardRef(TablePage);
