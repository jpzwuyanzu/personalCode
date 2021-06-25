<template>
  <div class="addAdmin-page">
    <el-drawer
      title="添加管理员"
      :before-close="handleClose"
      :visible="addDialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
    >
      <div class="demo-drawer__content">
        <el-form :model="form">
          <el-form-item label="管理员账户" :label-width="formLabelWidth">
            <el-input v-model="form.account" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="管理员角色" :label-width="formLabelWidth">
            <el-select
              style="width: 100%"
              v-model="form.role"
              placeholder="请选择管理员角色"
            >
              <el-option label="普通管理员" value="1"></el-option>
              <el-option label="测试人员" value="2"></el-option>
              <el-option label="运营人员" value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="管理员状态" :label-width="formLabelWidth">
            <el-radio v-model="form.accountState" label="1">启用</el-radio>
            <el-radio v-model="form.accountState" label="2">禁用</el-radio>
          </el-form-item>
        </el-form>
        <div class="demo-drawer__footer">
          <el-button @click="cancelForm">取 消</el-button>
          <el-button
            type="primary"
            @click="drawer.closeDrawer()"
            >确 定</el-button
          >
        </div>
      </div>
    </el-drawer>
  </div>
</template>

<script setup>
import { ref, defineProps, computed, defineEmit, reactive } from "vue";
import { Msgbox, Message} from 'element3'

const props = defineProps({ dialog: Boolean });
const emit = defineEmit(["showAddAdmin"]);
let form = ref({account: "", role: "", accountState: ""});
let formLabelWidth = ref("120px");
const drawer = ref(null)


const addDialog = computed({
  get: () => props["dialog"],
  set: (value) => emit("showAddAdmin", { dialog: value }),
});

function handleClose() {
    if(form.value.account === '' || form.value.role === '' || form.value.accountState === '') {
        Message({
          type:'error',
          message: "请完整填写账户，角色以及管理员状态！"
        })
    } else {
        Message({
          type: 'success',
          message: '提交成功!'
        })
      addDialog.value = false
    }
}
function cancelForm() {
  addDialog.value = false;
}
</script>

<style lang="scss" scoped>
.addAdmin-page {
  width: 300px;
}
.demo-drawer__content {
  padding: 50px;
  text-align: left;
  .demo-drawer__footer {
    position: absolute;
    bottom: 50px;
    right: 50px;
  }
}
.el-form-item {
  margin-bottom: 40px;
}
</style>
