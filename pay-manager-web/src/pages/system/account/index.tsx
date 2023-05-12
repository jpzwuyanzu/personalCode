import { useState, useRef } from 'react';
import { ProColumns } from '@ant-design/pro-components';
import services from '@/services';
import { System, APP_IS_PAYMENT, BaseModalConfig } from '@/constants';
import { TablePage } from '@/components';
import utils from '@/utils';
import common from '@/utils/common';
import { PlusOutlined } from '@ant-design/icons';
import { isEmpty } from 'lodash';
import { useModel } from 'umi';
import { message, Modal } from 'antd';
import PasswordModel from './modal/passwordModel';
import EditModel from './modal/editModel';
import RoleUpdateModal from './modal/roleUpdateModal';
import { Columns } from '@/types';

export default () => {
  const { merchantList } = useModel('global');

  const tablePageRef = useRef<any>();

  const [isOpenPwd, setIsOpenPwd] = useState(false);
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [current, setCurrent] = useState({});
  const [roleVisible, setRoleVisible] = useState(false);

  const refresh = () => tablePageRef?.current?.reload();

  const handleUpdatePassword = (record: any) => {
    setCurrent(record);
    setIsOpenPwd(true);
  };

  const handleUpdateEdit = async (record: any) => {
    if (isEmpty(record)) {
      setCurrent(record);
    } else {
      setCurrent(record);
    }
    setIsOpenEdit(true);
  };

  const handleAuth = async (record: any) => {
    setCurrent(record);
    setRoleVisible(true);
  };

  const handleUpdateStatus = async (record: any, title: string) => {
    const { userId, userName } = record;

    Modal.confirm({
      title,
      content: `确认要${title}(${userName})该账号吗？`,
      onOk: async () => {
        await services.system.account.changeStatus({
          userId,
          status: +record?.status === 0 ? 1 : 0,
        });
        refresh();
        message.success('修改成功');
      },
      ...BaseModalConfig,
    });
  };

  const columns: Columns[] = [
    {
      title: '账号ID',
      dataIndex: 'userId',
      hideInForm: true,
    },
    {
      title: '账号',
      dataIndex: 'userName',
      formItemProps: {
        rules: [
          common.ruleUtils.getRule('required'),
          common.ruleUtils.getRule('username'),
        ],
      },
    },
    {
      title: '姓名',
      dataIndex: 'nickName',
      hideInSearch: true,
      formItemProps: {
        rules: [common.ruleUtils.getRule('required')],
      },
    },
    {
      title: '后台角色',
      dataIndex: 'roleName',
      valueType: 'text',
      hideInSearch: true,
      formItemProps: {
        rules: [common.ruleUtils.getRule('required')],
      },
    },
    {
      title: '管理范围',
      dataIndex: 'merchantId',
      valueType: 'select',
      fieldProps: {
        allowClear: false,
      },
      initialValue: '',
      hideInSearch: !APP_IS_PAYMENT,
      hideInTable: !APP_IS_PAYMENT,
      request: System.BaseRequestAsync(merchantList),
      render(_, record) {
        const { ancestors } = record;
        const ancestorsList = String(ancestors).split(',');
        if (
          ancestors === '' ||
          (ancestorsList.length &&
            ancestorsList.length === merchantList.length - 1)
        ) {
          return `【全部】`;
        }

        const result: string[] = [];

        ancestorsList.forEach((id: string) => {
          merchantList.forEach((item: any) => {
            if (String(id) === String(item.value)) {
              result.push(item.label);
            }
          });
        });

        return common.antdUtils.renderTips(result.join(','));
      },
      width: 180,
    },
    // {
    //   title: '绑定商户',
    //   dataIndex: 'merchantId',
    //   valueType: 'select',
    //   fieldProps: {
    //     allowClear: false,
    //   },
    //   hideInSearch: APP_IS_PAYMENT,
    //   hideInTable: APP_IS_PAYMENT,
    //   request: System.BaseRequestAsync(merchantList),
    //   width: 180,
    // },
    {
      title: '验证码秘钥',
      dataIndex: 'googleKey',
      hideInSearch: true,
      width: 180,
    },
    {
      title: '限制IP',
      valueType: 'textarea',
      dataIndex: 'ip',
      hideInSearch: true,
      formItemProps: {
        rules: [common.ruleUtils.getRule('multipleIpAddress')],
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'select',
      fieldProps: {
        allowClear: false,
        defaultValue: '',
      },
      hideInForm: true,
      request: System.BaseRequestAsync(System.SystemAccountStatusList),
      render: (text, record) =>
        common.antdUtils.renderTag(
          System.SystemAccountStatusList,
          +record.status,
        ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'radio',
      request: System.BaseRequestAsync(
        System.SystemAccountStatusList.filter((i) => i.value !== ''),
      ),
      hideInSearch: true,
      hideInTable: true,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      hideInSearch: true,
      hideInForm: true,
      width: 140,
    },
    {
      title: '最后登录时间',
      dataIndex: 'loginDate',
      hideInSearch: true,
      hideInForm: true,
      width: 140,
    },
  ];

  return (
    <>
      <TablePage
        moduleTitle="账号管理"
        moduleName="账号"
        columns={columns}
        beforeRequestFormat={(param) => {
          param.ip = utils.getContentOfFields(param.ip, true).join(',');
          return param;
        }}
        listRequest={services.system.account.list}
        scroll={{ x: 1200 }}
        actionsWidth={APP_IS_PAYMENT ? 240 : 160}
        tableRef={tablePageRef}
        actions={(record) => {
          const isDisabled = +record?.status === 1;
          const statusLabel = isDisabled ? '启用' : '禁用';
          return common.antdUtils.renderTableAction([
            {
              label: '编辑',
              auth: 'system-account-edit',
              onClick: () => handleUpdateEdit(record),
            },
            {
              label: '权限',
              auth: 'system-account-auth',
              onClick: () => handleAuth(record),
            },
            {
              label: '修改密码',
              auth: 'system-account-edit',
              onClick: () => handleUpdatePassword(record),
              hide: !APP_IS_PAYMENT,
            },
            {
              label: statusLabel,
              className: isDisabled ? 'text-green' : 'text-red',
              auth: 'system-account-status',
              onClick: () => handleUpdateStatus(record, statusLabel),
            },
          ]);
        }}
        toolBarActions={(record) =>
          common.antdUtils.renderTableAction(
            [
              {
                label: '添加账号',
                auth: 'system-account-auth',
                type: 'primary',
                icon: <PlusOutlined />,
                onClick: () => handleUpdateEdit({}),
              },
            ],
            true,
          )
        }
      />

      <PasswordModel
        visible={isOpenPwd}
        setVisible={setIsOpenPwd}
        current={current}
      />

      <EditModel
        visible={isOpenEdit}
        setVisible={setIsOpenEdit}
        current={current}
        refresh={refresh}
      />

      <RoleUpdateModal
        visible={roleVisible}
        setVisible={setRoleVisible}
        current={current}
        preview={true}
      />
    </>
  );
};
