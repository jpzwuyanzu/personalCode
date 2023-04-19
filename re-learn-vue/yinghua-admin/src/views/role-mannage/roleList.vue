<template>
  <div class="role_page_container">
    <div class="form_top_part">
      <div class="search_part">
        <a-row>
          <a-col :span="3"><a-input v-model:value="searchParams" placeholder="Basic usage" /></a-col>
          <a-col :span="2"> 
            <a-button type="primary">
                <template #icon><PlusOutlined /></template>
                搜索
            </a-button>
          </a-col>
          <a-col :span="2"> 
            <a-button type="primary" @click="showDrawer">
            <template #icon><PlusOutlined /></template>
            添加角色
          </a-button>
          </a-col>
        </a-row>
      </div>
    </div>
    <div class="table_part_container">
      <a-table :dataSource="resourceData" :columns="columns"  bordered :pagination="false" :scroll="{ x: 1500, y: 590 }"/>
    </div>
    <CusPagination @loadData="loadRoleList" :total="totalCount" :pageSizeOptions="pageSizeOptions"/>
    <a-drawer
      title="创建角色"
      :width="385"
      :visible="visible"
      :body-style="{ paddingBottom: '80px' }"
      :footer-style="{ textAlign: 'right' }"
      @close="onClose"
    >
      <a-form :model="formModel" :rules="rulesRef" layout="vertical">
        <a-row :gutter="24">
          <a-col :span="24">
            <a-form-item label="角色名称" name="roleName" v-bind="validateInfos.roleName">
              <a-input
                v-model:value="formModel.roleName"
                placeholder="请输入角色名称"
                @blur="validate('roleName', { trigger: 'blur' }).catch(() => {})"
              />
            </a-form-item>
            <a-form-item label="选择权限" name="permiseList" v-bind="validateInfos.permiseList">
                <a-tree
                    v-model:expandedKeys="expandedKeys"
                    v-model:selectedKeys="selectedKeys"
                    v-model:checkedKeys="checkedKeys"
                    checkable
                    :tree-data="treeData"
                    :height="250"
                    @check="checkPermiss"
                >
                    <template #title="{ title, key }">
                    <span v-if="key === '0-0-1-0'" style="color: #1890ff">{{ title }}</span>
                    <template v-else>{{ title }}</template>
                    </template>
                </a-tree>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
      <template #extra>
        <a-space>
          <a-button @click="onClose">取消</a-button>
          <a-button type="primary" @click="submitNewRole">提交</a-button>
        </a-space>
      </template>
    </a-drawer>
  </div>
</template>
<script setup lang="ts">
import { PlusOutlined } from "@ant-design/icons-vue";
import { reactive, ref, toRaw } from "vue";
import { Form } from'ant-design-vue';
import type { TreeProps } from 'ant-design-vue';
import { message } from 'ant-design-vue';
import CusPagination from '@/components/CusPagination.vue'

const useForm = Form.useForm;
//是否显示抽屉
const visible = ref<boolean>(false); 
// 搜索框数据
const searchParams = ref<String>('');
// 分页数据总条数
const totalCount = ref<number>(500);
// 分页器页码选项
const pageSizeOptions = ref<number[]>([10,20,50,100]);
//form数据模型
const formModel = reactive({roleName: "", permiseList: []}); 
//form数据规则
const rulesRef = reactive<any>({
  roleName:[{required: true, message: "请输入角色名称", trigger: 'blur' }],
  permiseList:[{ required: true, message: "请选择角色权限" }]
});
// 树形结构展开项
const expandedKeys = ref<string[]>([]);
//树形结构title选中状态
const selectedKeys = ref<string[]>([]);
//树形结构勾选项
const checkedKeys = ref<string[]>([]);
const { resetFields, validate, validateInfos } = useForm(formModel, rulesRef);
// table数据列
const columns = [
  {
    title: "角色名称",
    dataIndex: "roleName",
    align: 'center',
    width: 200,
    fixed: 'left'
  },
  {
    title: "角色ID",
    dataIndex: "roleId",
    align: 'center',
    width: 200,
    fixed: 'left'
  },
  {
    title: "IP",
    dataIndex: "ip",
    align: 'center',
    width: 800,
  },
  {
    title: "address",
    dataIndex: "address",
    align: 'center',
    width: 800,
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    align: 'center',
    width: 200,
    fixed: 'right'
  },
];
// table数据
const resourceData = reactive<any>([
  {
    key: "1",
    roleName: "测试角色001",
    roleId: "001",
    ip: '10.0.0.1',
    address: 'qwqwqw',
    createTime: "2023-04-19"
  },
  {
    key: "2",
    roleName: "测试角色002",
    roleId: "002",
    ip: '10.0.0.1',
    address: 'qwqwqw',
    createTime: "2023-04-19"
  },
  {
    key: "3",
    roleName: "测试角色003",
    roleId: "003",
    ip: '10.0.0.1',
    address: 'qwqwqw',
    createTime: "2023-04-19"
  },
  {
    key: "4",
    roleName: "测试角色004",
    roleId: "004",
    ip: '10.0.0.1',
    address: 'qwqwqw',
    createTime: "2023-04-19"
  },
  {
    key: "5",
    roleName: "测试角色005",
    roleId: "005",
    ip: '10.0.0.1',
    address: 'qwqwqw',
    createTime: "2023-04-19"
  },
  {
    key: "6",
    roleName: "测试角色006",
    roleId: "006",
    ip: '10.0.0.1',
    address: 'qwqwqw',
    createTime: "2023-04-19"
  },
  {
    key: "7",
    roleName: "测试角色007",
    roleId: "007",
    ip: '10.0.0.1',
    address: 'qwqwqw',
    createTime: "2023-04-19"
  },
  {
    key: "8",
    roleName: "测试角色008",
    roleId: "008",
    ip: '10.0.0.1',
    address: 'qwqwqw',
    createTime: "2023-04-19"
  },
  {
    key: "9",
    roleName: "测试角色009",
    roleId: "009",
    ip: '10.0.0.1',
    address: 'qwqwqw',
    createTime: "2023-04-19"
  },
  {
    key: "10",
    roleName: "测试角色010",
    roleId: "010",
    ip: '10.0.0.1',
    address: 'qwqwqw',
    createTime: "2023-04-19"
  },
  {
    key: "11",
    roleName: "测试角色012",
    roleId: "012",
    ip: '10.0.0.1',
    address: 'qwqwqw',
    createTime: "2023-04-19"
  },
  {
    key: "13",
    roleName: "测试角色013",
    roleId: "013",
    ip: '10.0.0.1',
    address: 'qwqwqw',
    createTime: "2023-04-19"
  },
]);
//权限数据
const treeData: TreeProps['treeData'] = [
  {
    title: '首页',
    key: '0-0',
  },
  {
    title: '用户管理',
    key: '1-0',
    children: [
      {
        title: '用户列表',
        key: '1-1',
      },
      {
        title: '用户统计',
        key: '1-2',
      },
    ],
  },
  {
    title: '订单管理',
    key: '2-0',
    children: [
      {
        title: '订单列表',
        key: '2-1',
      },
      {
        title: '订单统计',
        key: '2-2',
      },
    ],
  },
]
// 加载角色列表的ajax请求
const loadRoleList = async(params: any) => {
  console.log('角色列表数据加载', 'current:',params.current.value, 'pageSize:',params.pageSize.value)
}
// 监听tree的check事件
const checkPermiss = (keys: any, e: any) => {
  // console.log('keys:', keys)
  // console.log('e.halfCheckedKeys :', e.halfCheckedKeys)
  formModel.permiseList = e.halfCheckedKeys.concat(keys)
}
//打开抽屉
const showDrawer = () => {
  visible.value = true;
};
//关闭抽屉需要清除表单数据
const onClose = () => {
  resetFields()
  expandedKeys.value = [];
  checkedKeys.value = [];
  selectedKeys.value = [];
  visible.value = false;
};
//提交创建角色
const submitNewRole = async() => {
  try {
    const values = await validate();
    resourceData.push({
      key: String(resourceData.length),
      roleName: values.roleName,
      roleId: '00'+String(resourceData.length),
      createTime: "2023-04-19"
    })
    message.success('创建角色成功')
    // 以后可以再这里对接接口
    visible.value = false;
  } catch (error) {
    console.log(error)
  }
}
</script>
<style lang="scss">
.role_page_container {
  width: 100%;
  height: 100%;
  .form_top_part {
    padding-top: 20px;
    padding-bottom: 30px;
  }
  .table_part_container {
    height: 84%;
    overflow-y: scroll;
    margin-bottom: 10px;
  }
}
</style>
