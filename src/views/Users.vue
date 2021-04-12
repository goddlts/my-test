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
      v-loading="loading"
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
          <el-button type="danger" icon="el-icon-delete" @click="handleDelete" plain size="mini"></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[2, 4, 6, 8]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      searchValue: '',
      list: [],
      loading: false,
      // 分页数据
      pagenum: 1,
      pagesize: 2,
      total: 0
    }
  },
  created () {
    this.loadData()
  },
  methods: {
    async loadData () {
      this.loading = true
      try {
        // 请求之前设置令牌
        this.$http.defaults.headers.Authorization = window.localStorage.getItem('token')
        const res = await this.$http.get('/users', {
          params: {
            pagenum: this.pagenum,
            pagesize: this.pagesize,
            query: this.searchValue
          }
        })
        // res 是axios对象封装的响应对象
        // data 是接口返回的数据，status 是响应码
        const { data } = res
        // 获取数据成功
        this.list = data.users
        // 记录共多少条数据
        this.total = data.total
      } catch (err) {
        console.log(err)
      } finally {
        this.loading = false
      }
    },
    // 分页方法
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.pagenum = 1
      this.loadData()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.loadData()
    },
    // 点击删除按钮
    handleDelete () {
      // 弹出删除的对话框
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 点击了确定按钮，删除

        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        console.log('您取消了删除的操作')
      })
    }
  }
}
</script>

<style lang="less">
.card {
  height: 100%;
}
</style>
