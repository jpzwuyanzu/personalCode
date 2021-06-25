<template>
    <div class="adminPage">
      <el-table :data="state.list" style="width: 100%">
      <el-table-column align="center" prop="userName" label="管理员账户" > </el-table-column>
      <el-table-column align="center"  prop="role" label="角色">
        <template v-slot="scope">
          <div>
            {{ scope.row.role === '1' ? '超级管理员' : '游客'}}
          </div>
        </template>
      </el-table-column>
      <el-table-column align="center"  prop="loginState" label="登录状态">
        <template v-slot="scope">
         <span>{{scope.row.loginState === true ? '已登录' : '未登录'}}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <el-button type="primary" icon="el-icon-plus" @click="showAddAdmin({ 'dialog': true })">添加</el-button>
        <el-button type="danger" icon="el-icon-delete" >删除</el-button>
      </el-table-column>
    </el-table>
    <AddAdmin :dialog="dialog" @showAddAdmin= "showAddAdmin" />
    </div>
</template>

<script setup>
import { ref } from 'vue'
import { adminList } from './model/adminModel'
import AddAdmin from './components/addAdmin.vue'

const { state, getAdminList }  = adminList()
let dialog = ref(false)

function showAddAdmin (params) {
  dialog.value = params.dialog
}

</script>

<style scoped>
a {
  color: #42b983;
}
</style>