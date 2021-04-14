<template>
  <el-card class="card">
    <!-- 面包屑组件 -->
    <my-components level1="角色管理" level2="角色列表"></my-components>

    <el-button style="margin: 10px 0px;">添加角色</el-button>
  </el-card>
</template>

<script>
import MyComponents from '../../components/MyComponents.vue'
export default {
  components: { MyComponents }

}
</script>

<style>

</style>
