<template>
  <el-card class="card">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <div style="margin-top: 10px; margin-bottom: 10px;">
      <!-- 搜索框 -->
      <el-input style="width: 300px;" placeholder="请输入内容" v-model="searchValue">
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>

      <el-button type="success" plain style="margin-left: 10px;">添加用户</el-button>
    </div>
    <!-- 表格 -->
    <el-table
      :data="list"
      stripe
      border
      style="width: 100%">
      <el-table-column
        type="index"
        width="50">
      </el-table-column>
      <el-table-column
        prop="username"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="email"
        show-overflow-tooltip
        width="150"
        label="邮箱">
      </el-table-column>
      <el-table-column
        prop="mobile"
        width="120"
        label="电话">
      </el-table-column>
      <el-table-column
        prop="role_name"
        label="角色">
      </el-table-column>
      <el-table-column
        width="120"
        label="创建时间">
        <template slot-scope="scope">
          {{ scope.row.create_time | fmtDate('YYYY-MM-DD') }}
        </template>
      </el-table-column>
      <el-table-column
        prop="mg_state"
        label="状态">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        width="200"
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
export default {
  data () {
    return {
      searchValue: '',
      list: []
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      try {
        // 请求之前设置令牌
        this.$http.defaults.headers.Authorization = window.localStorage.getItem('token')
        const res = await this.$http.get('http://localhost:8888/api/private/v1/users', {
          params: {
            pagenum: 1,
            pagesize: 10,
            query: this.searchValue
          }
        })
        console.log(res)
        // res 是axios对象封装的响应对象
        // data 是接口返回的数据，status 是响应码
        const { data, status } = res
        if (status === 200) {
          const { meta: { msg, status: code } } = data
          if (code === 200) {
            // 获取数据成功
            this.list = data.data.users
          } else {
            // 失败
            this.$message({
              message: msg,
              type: 'error'
            })
          }
        } else {
          // 请求失败
          this.$message({
            message: '请求失败',
            type: 'error'
          })
        }
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="less">
.card {
  height: 100%;
}
</style>
