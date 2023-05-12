import TablePage from '@/components/TablePage';
import { Columns } from '@/types';
import { Input, Select, Modal, message } from 'antd';
import { useState, useRef } from 'react';
import services from '@/services';
import common from '@/utils/common';
import { BaseModalConfig } from '@/constants';
import utils from '@/utils';

export default () => {
  const tablePageRef = useRef<any>();
  const [keywordType, setKeywordType] = useState('userName');

  const refresh = () => tablePageRef?.current?.reload();

  const handleDelete = async (record: any) => {
    const { id } = record;

    Modal.confirm({
      title: `删除(${record.ip})`,
      content: `确认要删除账号(${record.userName})的IP白名单吗？`,
      onOk: async () => {
        await services.system.ip.del({ id });
        refresh();
        message.success('删除成功');
      },
      ...BaseModalConfig,
    });
  };

  const columns: Columns[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      // hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '后台账号',
      dataIndex: 'userName',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '关键字',
      dataIndex: 'keyword',
      renderFormItem: () => {
        const selectBefore = (
          <Select
            defaultValue={keywordType}
            style={{ width: '120px' }}
            onChange={setKeywordType}
          >
            <Select.Option value="userId">用户ID</Select.Option>
            <Select.Option value="userName">用户名称</Select.Option>
          </Select>
        );

        return <Input addonBefore={selectBefore} placeholder="请输入" />;
      },
      hideInSearch: true,
      hideInTable: true,
      formItemProps: {
        rules: [
          common.ruleUtils.getRule('required'),
          // common.ruleUtils.getRule('validator', '', {
          //   validator(rule, value, callback) {
          //     if (value && keywordType === 'userName') {
          //       const { pattern, message } = common.ruleUtils.rulesMap.username()
          //       if (!pattern.test(value)) {
          //         return callback(message)
          //       }
          //     }
          //     if (value && keywordType === 'userId') {
          //       const { pattern, message } = common.ruleUtils.rulesMap.userId()
          //       if (!pattern.test(value)) {
          //         return callback(message)
          //       }
          //     }
          //     callback()
          //   },
          // }),
        ],
      },
    },
    {
      title: '后台账号',
      dataIndex: 'keyword',
      hideInForm: true,
      hideInTable: true,
      fieldProps: {
        placeholder: '请输入账号',
      },
    },
    {
      title: 'IP',
      dataIndex: 'ip',
      valueType: 'textarea',
      formItemProps: {
        rules: [
          common.ruleUtils.getRule('required'),
          common.ruleUtils.getRule('multipleIpAddress'),
        ],
      },
    },
    {
      title: '操作人',
      dataIndex: 'createName',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      hideInForm: true,
    },
  ];

  return (
    <>
      <TablePage
        moduleName="白名单"
        moduleTitle="IP管理"
        columns={columns}
        tableRef={tablePageRef}
        beforeRequestFormat={(param) => {
          param[keywordType] = param.keyword;

          param.ips = utils.getContentOfFields(param.ip, true).join(',');
          delete param.ip;
          return param;
        }}
        authConfig={{
          addAuth: common.permissionUtils.checkPageResource('system-ip-add'),
        }}
        actions={(record) =>
          common.antdUtils.renderTableAction([
            {
              label: '删除',
              auth: 'system-ip-del',
              className: 'text-red',
              onClick: () => handleDelete(record),
            },
          ])
        }
        actionsWidth={100}
        addRequest={services.system.ip.add}
        listRequest={services.system.ip.list}
        // delRequest={services.system.ip.del}
      />
    </>
  );
};
