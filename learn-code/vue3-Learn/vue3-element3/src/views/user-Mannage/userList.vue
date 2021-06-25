<template>
  <div class="userListPage">
    <div class="tabContainer">
      <el-table :data="state.list"   style="width: 100%">
      <el-table-column  label="用户头像">
        <template v-slot="scope">
          <img style="width:60px;height:60px;" :src="scope.row.avator" alt="">
        </template>
      </el-table-column>
      <el-table-column prop="userId" label="用户ID"> </el-table-column>
      <el-table-column prop="name" label="用户名" > </el-table-column>
      <el-table-column prop="sex" label="性别" > </el-table-column>
      <el-table-column prop="age" label="年龄"> </el-table-column>
      <el-table-column prop="state" label="是否禁用">
        <template v-slot="scope">
          <el-switch v-model="scope.row.state" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column  label="操作">
         <el-popconfirm 
         title="确定删除该用户吗？"
         align="center"
         @onConfirm="deleteUser"
         >
            <template v-slot:reference>
              <el-button type="danger" icon="el-icon-delete" >删除</el-button>
            </template>
          </el-popconfirm>
      </el-table-column>
    </el-table>
    </div>
    <!-- <div class="pageNationContainer">
      <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 15, 20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="10"
    >
    </el-pagination>
    </div> -->
    </div>
</template>

<script setup>
import { userList }  from './model/userModel'
import { Message } from 'element3'
import { ref } from 'vue'

const { state, getList }  = userList()
const currentPage = ref(0)

const deleteUser = () => {
  Message({
            message: '恭喜你，删除用户成功！',
            type: 'success'
          })
}
function handleSizeChange() {

}
function handleCurrentChange() {

}

</script>

<style lang="scss" scoped>
.userListPage {
  width: 100%;
  height: 100%;
  .tabContainer {
    width: 100%;
  }
  .pageNationContainer {
    margin-top: 50px;
  }
}
</style>