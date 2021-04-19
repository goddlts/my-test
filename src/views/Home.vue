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
            <el-button @click="handlLogout">退出</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="aside">
        <!-- 侧边栏 -->
        <div class="collapseBar">折叠</div>
        <!-- 折叠菜单 -->
        <!--
          default-active  默认激活的项 el-menu-item 的 index 的值
          router 默认是false ，想要使用路由模式 开启 true
         -->

         <!-- $route.path  $route 是当前页面的路由规则  path 是当前的路由地址 -->
        <el-menu
          :default-active="$route.path"
          background-color="#333744"
          router
          text-color="#fff"
          active-text-color="#ffd04b">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-platform-eleme"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/users">
              <i class="el-icon-menu"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-platform-eleme"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="/roles">
              <i class="el-icon-menu"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="/rights">
              <i class="el-icon-menu"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-platform-eleme"></i>
              <span>商品管理</span>
            </template>
            <el-menu-item index="3-1">
              <i class="el-icon-menu"></i>
              <span>商品列表</span>
            </el-menu-item>
            <el-menu-item index="3-2">
              <i class="el-icon-menu"></i>
              <span>分类参数</span>
            </el-menu-item>
            <el-menu-item index="3-3">
              <i class="el-icon-menu"></i>
              <span>商品分类</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-platform-eleme"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="4-1">
              <i class="el-icon-menu"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-platform-eleme"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="5-1">
              <i class="el-icon-menu"></i>
              <span>数据报表</span>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="main">
        <!-- 主内容区域 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  methods: {
    handlLogout () {
      // 移除本地存储中的token
      localStorage.removeItem('token')
      // 提示
      this.$message({
        type: 'info',
        message: '退出成功'
      })
      // 跳转到登录页面
      this.$router.push('/login')
    }
  }
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

  .collapseBar {
    background-color: #4a5064;
    color: #fff;
    font-size: 12px;
    letter-spacing: 0.2em;
    line-height: 35px;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    text-align: center;
  }
}

.main {
  background-color: #e9eef3;
  height: 100%;
}
</style>
