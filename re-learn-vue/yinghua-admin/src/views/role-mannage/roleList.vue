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
    <a-table :dataSource="resourceData" :columns="columns"  bordered :pagination="false"/>
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
import { reactive, ref } from "vue";
import { Form } from'ant-design-vue';
import type { TreeProps } from 'ant-design-vue';
import { message } from 'ant-design-vue';

const useForm = Form.useForm;
//是否显示抽屉
const visible = ref<boolean>(false); 
// 搜索框数据
const searchParams = ref<String>('');
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
    align: 'center'
  },
  {
    title: "角色ID",
    dataIndex: "roleId",
    align: 'center'
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    align: 'center'
  },
];
// table数据
const resourceData = reactive<any>([
  {
    key: "1",
    roleName: "测试角色001",
    roleId: "001",
    createTime: "2023-04-19"
  },
  {
    key: "2",
    roleName: "测试角色002",
    roleId: "002",
    createTime: "2023-04-19"
  },
  {
    key: "3",
    roleName: "测试角色003",
    roleId: "003",
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
}
</style>
