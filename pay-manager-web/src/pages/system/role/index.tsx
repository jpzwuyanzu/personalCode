import TablePage from '@/components/TablePage';
import { Columns } from '@/types';
import services from '@/services';
import { useState, useRef } from 'react';
import common from '@/utils/common';
import { pick } from 'lodash';
import RoleUpdateModal from './modal/roleUpdateModal';

export default () => {
  const tablePageRef = useRef<any>();
  const [roleVisible, setRoleVisible] = useState(false);
  const [current, setCurrent] = useState({});

  const columns: Columns[] = [
    {
      title: 'ID',
      dataIndex: 'roleId',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '角色名称',
      dataIndex: 'roleName',
      formItemProps: {
        rules: [common.ruleUtils.getRule('required')],
      },
    },
    {
      title: '修改时间',
      dataIndex: 'updateTime',
      hideInSearch: true,
      hideInForm: true,
    },
    {
      title: '操作人',
      dataIndex: 'updateBy',
      hideInSearch: true,
      hideInForm: true,
    },
  ];

  /**
   * 点击权限
   */
  const handlePermission = async (record: any) => {
    setCurrent(record);
    setRoleVisible(true);
  };

  const refresh = () => tablePageRef?.current?.reload();

  return (
    <>
      <TablePage
        rowKey={'roleId'}
        moduleName="角色"
        moduleTitle="角色管理"
        editNameKey='roleName'
        columns={columns}
        addRequest={services.system.role.addRole}
        listRequest={services.system.role.getRolelist}
        editRequest={services.system.role.editRole}
        beforeRequestFormat={(arg) => {
          const params = pick(arg, ['roleId', 'roleName']);
          return params;
        }}
        authConfig={{ 
          addAuth: common.permissionUtils.checkPageResource('system-role-add'),
          editAuth: common.permissionUtils.checkPageResource('system-role-edit'),
        }}
        formWidth={500}
        tableRef={tablePageRef}
        actions={(record) =>
          common.antdUtils.renderTableAction([
            {
              label: '权限',
              auth: 'system-role-auth',
              onClick: () => handlePermission(record),
            },
          ])
        }
      />
      <RoleUpdateModal
        visible={roleVisible}
        setVisible={setRoleVisible}
        current={current}
        refresh={refresh}
      />
    </>
  );
};
