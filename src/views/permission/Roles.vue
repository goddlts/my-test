<template>
  <el-card class="card">
    <!-- 面包屑组件 -->
    <my-components level1="角色管理" level2="角色列表"></my-components>

    <el-button style="margin: 10px 0px;">添加角色</el-button>

    <!-- 表格 -->
    <el-table
      border
      stripe
      :data="list"
      style="width: 100%">
      <el-table-column
        type="expand">
      </el-table-column>
      <el-table-column
        prop="roleName"
        label="角色名称">
      </el-table-column>
      <el-table-column
        prop="roleDesc"
        label="角色描述">
      </el-table-column>
      <el-table-column
        label="操作">
        <template>
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
import MyComponents from '../../components/MyComponents.vue'
export default {
  components: { MyComponents },
  data () {
    return {
      list: []
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      const data = await this.$http.get('/roles')
      this.list = data.data
    }
  }
}
</script>

<style>

</style>
