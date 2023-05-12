import { ModalForm } from '@ant-design/pro-components';
import { useRef, useState } from 'react';
import { message, Spin, Tree } from 'antd';
import services from '@/services';
import { useAsyncEffect } from 'ahooks';
import { cloneDeep, difference} from 'lodash';
import { BaseModalConfig} from '@/constants'
import utils from '@/utils';

const { TreeNode } = Tree;

export default (props: any) => {
  const { visible, setVisible, current, refresh, preview = false } = props;

  const [loading, setLoading] = useState(false);
  const [roleTree, setRoleTree] = useState([]);
  const [allIds, setAllIds] = useState<string[]>([]);
  const [checkedIds, setCheckedIds] = useState<string[]>([]);

  const formRef = useRef<any>();

  const getCheckedKeys = (roleTree: any[], checkedKeys: string[]) => {
    const AllIds: string[] = [];
    const CheckedIds: string[] = [];

    const comb = (data: any[], allList: string[], checkedList: string[]) => {
      data.forEach((dataItem: any) => {
        if (dataItem.id && dataItem.label) {
          dataItem.id = String(dataItem.id);
          allList.push(String(dataItem.id));
          // 无这个字段
          if (dataItem.isChecked) checkedList.push(String(dataItem.id));

          if (dataItem.children && utils.types(dataItem.children) === 'array') {
            comb(dataItem.children, allList, checkedList);
          }
        }
      });
    };

    comb(roleTree, AllIds, CheckedIds);

    setAllIds(AllIds)
    setCheckedIds(preview ? AllIds : cloneDeep(checkedKeys))
  };

  useAsyncEffect(async () => {
    if (visible) {
      const { roleId } = current;

      setLoading(true);
      const data: any = await services.system.role
        .getRoleMenuTree({ roleId })
        .finally(() => setLoading(false));

      if (utils.types(data) === 'object') {
        const dataKeys = data.checkedKeys.map((i: number) => String(i))
        setRoleTree(data.menus);
        setCheckedIds(dataKeys);
        getCheckedKeys(data.menus, dataKeys);
      }
    }
  }, [visible]);

  const  onCheck = (checkedKeys: any, e: any) => {
    const checkedId = e.node.props.eventKey;
    let newCheckedIds = cloneDeep(checkedIds);

    // 找到当前id的所有父级id;
    const getParentIds = (id: string) => {
      const parentKeys = [];
      for (let i = 0; i < id.length; i += 1) {
        let item = '';
        if (i % 2 === 0 && i !== 0) {
          item = id.substr(0, i);
          parentKeys.push(item);
        }
      }
      return parentKeys;
    };

    // 找到当前id的所有子集id;
    const getChildIds = (id: string, isIncludeCurrent = false, idMap = allIds) => {
      const childKeys: string[] = [];
      idMap.forEach((key: string) => {
        if (key.includes(id) && key.substr(0, id.length) === id) {
          if (key === id) {
            if (isIncludeCurrent) {
              childKeys.push(key);
            }
          } else {
            childKeys.push(key);
          }
        }
      });
      return childKeys;
    };

    const isRemoveParent = (idList: string[], id: string) => {
      const parentId = id.substr(0, id.length - 2);
      const childIds = getChildIds(parentId, false, idList);
      if (childIds.length) {
        return idList;
      }
      if (String(parentId).length === 2) {
        return idList.filter((i: string) => i !== parentId);
      }
      return idList;
      // return idList.filter((i: string) => i !== parentId);
    };

    // 如果是选中
    if (e.checked) {
      const parentIds = getParentIds(String(checkedId));
      const childIds = getChildIds(String(checkedId));
      newCheckedIds = newCheckedIds.concat(parentIds, childIds, [checkedId]);
    } else {
      const childIds = getChildIds(String(checkedId), true);
      // 移除所有子集
      newCheckedIds = difference(newCheckedIds, childIds);
      if (String(checkedId).length >= 4 && !['2100'].includes(String(checkedId))) {
        newCheckedIds = isRemoveParent(newCheckedIds, String(checkedId));
      }
    }
    setCheckedIds([...new Set(newCheckedIds)])
  }

  const renderTreeNodeTitle = (item: any) => {
    if ([2, 4].includes(String(item.id).length)) {
      return (
        <span
          style={{
            fontSize: '14px',
            fontWeight: 700,
            padding: '10px 0'
          }}
        >
          {item.label}
        </span>
      );
    }
    return item.label;
  };

  const renderTreeNodes = (data: any[]) => {
    if (!Array.isArray(data)) {
      return <TreeNode></TreeNode>;
    }
    return data.map((item: any) => {
      const styles =
        String(item.id).length === 2 ? { marginTop: '10px' } : {};

      if (item.children) {
        return (
          <TreeNode
            title={renderTreeNodeTitle(item)}
            key={String(item.id)}
            style={styles}
          >
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return (
        <TreeNode
          title={renderTreeNodeTitle(item)}
          key={String(item.id)}
          style={styles}
        />
      );
    });
  };

  return (
    <ModalForm
      title={`角色权限设置(${current.roleName})`}
      formRef={formRef}
      open={visible}
      autoFocusFirstInput
      grid
      modalProps={{
        ...BaseModalConfig,
        onCancel: () => setVisible(false),
      }}
      colProps={{ span: 24 }}
      rowProps={{ gutter: 10 }}
      width={600}
      onFinish={async () => {
        if (loading) return;
        const requestParams = {
          roleId: current.roleId,
          menuIds: checkedIds
        };

        setLoading(true)
        await services.system.role.editRoleAuth(requestParams).finally(() =>  setLoading(false));
        setVisible(false);
        setCheckedIds([])
        // refresh && refresh();
        message.success('修改成功')
        return true;
      }}
      initialValues={{ username: current?.userName }}
    >
      <Spin tip="Loading..." spinning={loading}>
        <div className="role-content">
          {roleTree.length ? (
            <Tree
              checkable
              defaultExpandAll
              defaultExpandParent
              checkStrictly
              autoExpandParent
              disabled={preview}
              checkedKeys={checkedIds}
              onCheck={onCheck}
            >
              {renderTreeNodes(roleTree)}
            </Tree>
          ) : null}
        </div>
      </Spin>
    </ModalForm>
  );
};
