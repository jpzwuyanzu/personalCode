<template>
    <div class="sysInfo-page">
      <h3 class="tab-title">服务器信息</h3>
      <el-table
        :data="tableData"
        style="width: 100%">
        <el-table-column align="center" prop="time" label="搭建时间"> </el-table-column>
        <el-table-column align="center" prop="serverBate" label="服务端版本"> </el-table-column>
        <el-table-column align="center" prop="clientBate" label="客户端版本"> </el-table-column>
        <el-table-column align="center" prop="serverTime" label="当前服务器时间"> </el-table-column>
        <el-table-column align="center" prop="state" label="服务器状态"> </el-table-column>
        <el-table-column align="center" prop="IP" label="服务器IP"> </el-table-column>
        <el-table-column align="center" prop="type" label="服务器类型">
          <template v-slot="scope">
            <div>
              {{ scope.row.type === '1' ? ' 测试服务器' : (scope.row.type === '2' ? '灰度服务器' : '正式服务器') }}
            </div>
          </template>
        </el-table-column>
      </el-table>
    </div>
</template>

<script setup>
import { defineProps, reactive } from 'vue'

const tableData = reactive([
  {
    time: '2021-06-15 00:00:00',
    serverBate: '1.0.0',
    clientBate: '1.0.0',
    serverTime: '2021-06-19 16:13:14',
    state: '正常',
    IP:'192.168.12.13',
    type: '1'
  },
  {
    time: '2021-06-15 00:00:00',
    serverBate: '1.0.0',
    clientBate: '1.0.0',
    serverTime: '2021-06-19 16:13:14',
    state: '正常',
    IP:'192.168.12.13',
    type: '2'
  },
  {
    time: '2021-06-15 00:00:00',
    serverBate: '1.0.0',
    clientBate: '1.0.0',
    serverTime: '2021-06-19 16:13:14',
    state: '正常',
    IP:'192.168.12.13',
    type: '3'
  },{
    time: '2021-06-15 00:00:00',
    serverBate: '1.0.0',
    clientBate: '1.0.0',
    serverTime: '2021-06-19 16:13:14',
    state: '正常',
    IP:'192.168.12.13',
    type: '1'
  },
  {
    time: '2021-06-15 00:00:00',
    serverBate: '1.0.0',
    clientBate: '1.0.0',
    serverTime: '2021-06-19 16:13:14',
    state: '正常',
    IP:'192.168.12.13',
    type: '2'
  }
])

const state = reactive({ count: 0 })
</script>

<style lang="scss" scoped>
.sysInfo-page {
  .tab-title {
    text-align: left;
    padding-left: 5px;
 }
}
</style>