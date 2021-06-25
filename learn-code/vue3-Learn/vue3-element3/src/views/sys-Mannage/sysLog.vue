<template>
    <div class="sysLog-page">
      <el-table :data="tableData" stripe style="width: 100%">
        <el-table-column align="center" prop="operatorName" label="操作员名称" > </el-table-column>
        <el-table-column align="center" prop="ip" label="IP地址" > </el-table-column>
        <el-table-column align="center" prop="action" label="操作名称"> </el-table-column>
        <el-table-column align="center" prop="time" label="操作员角色"> </el-table-column>
        <el-table-column align="center" prop="role" label="操作时间"> </el-table-column>
      </el-table>
    </div>
</template>

<script setup>
import { reactive } from 'vue'

const tableData = reactive([
  {
    operatorName: 'admin',
    ip:'192.189.12.16',
    action:'创建管理员',
    time:'2021-6-12 09:12:20',
    role: '超级管理员',
  },
  {
    operatorName: 'admin',
    ip:'192.189.12.16',
    action:'创建管理员',
    time:'2021-6-12 09:12:20',
    role: '超级管理员',
  },
  {
    operatorName: 'admin',
    ip:'192.189.12.16',
    action:'创建管理员',
    time:'2021-6-12 09:12:20',
    role: '超级管理员',
  },
  {
    operatorName: 'admin',
    ip:'192.189.12.16',
    action:'创建管理员',
    time:'2021-6-12 09:12:20',
    role: '超级管理员',
  },
  {
    operatorName: 'admin',
    ip:'192.189.12.16',
    action:'创建管理员',
    time:'2021-6-12 09:12:20',
    role: '超级管理员',
  },
  {
    operatorName: 'admin',
    ip:'192.189.12.16',
    action:'创建管理员',
    time:'2021-6-12 09:12:20',
    role: '超级管理员',
  },{
    operatorName: 'admin',
    ip:'192.189.12.16',
    action:'创建管理员',
    time:'2021-6-12 09:12:20',
    role: '超级管理员',
  }
])

const state = reactive({ count: 0 })
</script>

<style scoped>
</style>