<template>
  <el-card class="card">
    <my-components level1="商品管理" level2="添加商品"></my-components>
    <el-alert
      style="margin: 10px auto"
      title="添加商品"
      type="info"
      center
      :closable="false"
      show-icon>
    </el-alert>
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
