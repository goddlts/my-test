<template>
  <el-card class="card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <div style="margin-top: 10px;">
      <!-- 搜索框 -->
      <el-input style="width: 300px;" placeholder="请输入内容" v-model="searchValue">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>

      <el-button type="success" plain style="margin-left: 10px;">添加用户</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchValue: ''
    }
  }
}
</script>

<style lang="less">
.card {
  height: 100%;
}
</style>
