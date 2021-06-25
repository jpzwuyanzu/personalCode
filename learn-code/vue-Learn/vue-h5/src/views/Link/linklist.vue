<template>
  <div class="linklist">
      <el-divider class="dividerLine" content-position="center">基础用法</el-divider>
    <div>
  <el-link href="https://element.eleme.io" target="_blank">默认链接</el-link>
  <el-link type="primary">主要链接</el-link>
  <el-link type="success">成功链接</el-link>
  <el-link type="warning">警告链接</el-link>
  <el-link type="danger">危险链接</el-link>
  <el-link type="info">信息链接</el-link>
</div>
<el-divider class="dividerLine" content-position="center">禁用状态</el-divider>
<div>
  <el-link disabled>默认链接</el-link>
  <el-link type="primary" disabled>主要链接</el-link>
  <el-link type="success" disabled>成功链接</el-link>
  <el-link type="warning" disabled>警告链接</el-link>
  <el-link type="danger" disabled>危险链接</el-link>
  <el-link type="info" disabled>信息链接</el-link>
</div>
  </div>
</template>
<script>

export default {
  name: 'Linklist',
  components: {
  }
}
</script>
<style lang="scss" scoped>
    .dividerLine {
        margin-top: 50px;
        margin-bottom: 50px;
    }
</style>
