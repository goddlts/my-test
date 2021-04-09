<template>
  <el-container class="container">
    <el-header class="header">
      <!-- 头部 -->
      <el-row>
        <el-col :span="4">
          <img style="margin-left: 50px;" height="60px" src="../assets/logo.png" alt="">
        </el-col>
        <el-col :span="18">
          <div class="title">电商后台管理系统</div>
        </el-col>
        <el-col :span="2">
          <div class="btn">
            <el-button>退出</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">Aside</el-aside>
      <el-main class="main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

}
</script>

<style lang="less">
.container {
  height: 100%;
}

.header {
  background-color: #373d41;

  .title {
    font-size: 20px;
    color: white;
    line-height: 60px;
    text-align: center;
  }

  .btn {
    line-height: 60px;
  }
}

.aside {
  background-color: #333744;
}

.main {
  background-color: #e9eef3;
  height: 100%;
}
</style>
