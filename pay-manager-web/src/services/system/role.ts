import request from '@/utils/request';
export default {
  addRole(params: any) {
    return request.post('/system/role/add', params);
  },
  editRole(params: any) {
    return request.post('/system/role/editName', params);
  },
  editRoleAuth(params: any) {
    return request.post('/system/role/edit', params);
  },
  getRolelist(params: any = {}) {
    params.isAsc = 'desc';
    params.orderByColumn = 'updateTime';
    return request.table('/system/role/list', params, { method: 'get' });
  },
  /**
   * 获取角色的菜单
   */
  getRoleMenuTree(params: Record<'roleId', string>) {
    const { roleId } = params;
    return request.get(`/system/role/roleMenuTreeselect/${roleId}`);
  },

  /**
   * 获取所有的角色列表
   */
  async optionList() {
    const data: any = await request.get('/system/role/optionselect');
    if (Array.isArray(data)) {
      return data.map((item) => ({ label: item.roleName, value: item.roleId }));
    }
    return [];
  },
};
