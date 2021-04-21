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
    <!-- 步骤条 -->
    <el-steps :active="active" align-center finish-status="success">
      <el-step title="基本信息"></el-step>
      <el-step title="商品参数"></el-step>
      <el-step title="商品属性"></el-step>
      <el-step title="商品图片"></el-step>
      <el-step title="商品描述"></el-step>
    </el-steps>

    <!-- 标签页 -->
    <el-tabs tab-position="left" @tab-click="handleClick" style="height: 200px;">
      <el-tab-pane label="基本信息">基本信息</el-tab-pane>
      <el-tab-pane label="商品参数">商品参数</el-tab-pane>
      <el-tab-pane label="商品属性">商品属性</el-tab-pane>
      <el-tab-pane label="商品图片">商品图片</el-tab-pane>
      <el-tab-pane label="商品描述">商品描述</el-tab-pane>
    </el-tabs>
  </el-card>
</template>

<script>
import MyComponents from '../../components/MyComponents.vue'
export default {
  components: { MyComponents },
  data () {
    return {
      active: 0
    }
  },
  methods: {
    handleClick (tab) {
      // console.log(tab, event)
      this.active = tab.index - 0
    }
  }
}
</script>

<style>
.el-step__title {
  font-size: 12px;
  line-height: 38px;
}
</style>
