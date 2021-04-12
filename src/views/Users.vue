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
      <el-input clearable style="width: 300px;" placeholder="请输入内容" v-model="searchValue">
        <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
      </el-input>

      <el-button type="success" plain style="margin-left: 10px;" @click="handleShowDialog">添加用户</el-button>
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
            @change="handleSwitchChange(scope.row)"
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column
        width="200"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="handleEdit(scope.row)" plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" @click="handleDelete(scope.row.id)" plain size="mini"></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini" @click="handleShowSetRoleDialog(scope.row)"></el-button>
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

    <!-- 弹出对话框 添加/修改 -->
    <el-dialog @closed="handleCloseDialog" :title="title" :visible.sync="dialogFormVisible">
      <el-form ref="myform" :model="form" label-width="80px">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" :disabled="isEdit" autocomplete="off" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!isEdit">
          <el-input v-model="form.password" show-password clearable autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" prop="mobile">
          <el-input v-model="form.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSure">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 弹出对话框 分配角色 -->
    <el-dialog title="分配角色" :visible.sync="setRoleDialogVisible">
      <el-form label-width="100px">
        <el-form-item label="用户名">
          {{ currentUser && currentUser.username }}
        </el-form-item>
        <el-form-item label="请选择角色">
          <el-select v-model="currentRoleId" placeholder="请选择角色">
            <el-option disabled label="请选择角色" :value="-1" />
            <el-option
              v-for="item in roles"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="setRoleDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSetRole">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
// 导入 lodash 模块
import _ from 'lodash'

export default {
  data () {
    return {
      searchValue: '',
      list: [],
      loading: false,
      // 分页数据
      pagenum: 1,
      pagesize: 2,
      total: 0,
      // 添加/修改对话框需要的 数据
      title: '',
      dialogFormVisible: false,
      isEdit: false,
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 编辑时需要的用户id
      currentId: -1,
      // 分配角色对话框需要的数据
      setRoleDialogVisible: false,
      currentUser: null,
      currentRoleId: -1,
      roles: []
    }
  },
  created () {
    this.loadData()
    this.loadRoles()
  },
  // 侦听器，监视搜索内容的变化
  watch: {
    // 函数的防抖 https://www.lodashjs.com/docs/lodash.debounce
    //    执行一个函数的时候会等一段时间，每次调用函数都会等一段时间，最后一调用完成并且时间到达才会真正执行该函数
    //    百度的搜索文本框、拖动窗口大小的时候
    // 函数的节流 https://www.lodashjs.com/docs/lodash.throttle
    //    调用函数多次，都不执行，只有时间到达之后执行一次。
    //    无限下拉
    searchValue: _.debounce(function () {
      this.handleSearch()
    }, 500)
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
    async handleDelete (id) {
      try {
        await this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        // 此处点击的是确定
        await this.$http.delete(`/users/${id}`)
        this.loadData()
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      } catch {
        console.log('点了取消')
      }

      // 弹出删除的对话框
      // this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning'
      // }).then(async () => {
      //   // 点击了确定按钮，删除
      // await this.$http.delete(`/users/${id}`)
      // this.loadData()
      // this.$message({
      //   type: 'success',
      //   message: '删除成功!'
      // })
      // }).catch(() => {
      //   console.log('您取消了删除的操作')
      // })
    },
    // 开关改变，修改用户状态
    async handleSwitchChange (user) {
      await this.$http.put(`/users/${user.id}/state/${user.mg_state}`)
      this.$message({
        type: 'success',
        message: '修改用户状态成功'
      })
    },
    // 搜索功能
    handleSearch () {
      this.pagenum = 1
      this.loadData()
    },
    // 点击添加按钮
    handleShowDialog () {
      this.dialogFormVisible = true
      this.title = '添加用户'
      this.isEdit = false
    },
    // 点击弹出框的确定按钮
    async handleSure () {
      // 添加
      if (!this.isEdit) {
        await this.$http.post('/users', this.form)
      } else {
        // 修改的时候
        await this.$http.put(`/users/${this.currentId}`, {
          email: this.form.email,
          mobile: this.form.mobile
        })
      }

      this.dialogFormVisible = false
      this.loadData()
      this.$message({
        type: 'success',
        message: '操作成功'
      })
    },
    // 添加/编辑对话框关闭执行
    handleCloseDialog () {
      // this.form.username = ''
      // this.form.password = ''

      // 遍历 form 对象中的所有属性，并清空属性的值
      for (const key in this.form) {
        this.form[key] = ''
      }

      // 重置表单
      // this.$refs.myform.resetFields()
    },
    // 点击编辑按钮
    handleEdit (user) {
      this.dialogFormVisible = true
      this.isEdit = true
      this.title = '修改用户'

      this.currentId = user.id
      this.form.username = user.username
      this.form.mobile = user.mobile
      this.form.email = user.email
    },
    // 点击分配角色的按钮，弹出对话框
    async handleShowSetRoleDialog (user) {
      this.setRoleDialogVisible = true
      this.currentUser = user

      const data = await this.$http.get(`/users/${user.id}`)
      // 找到当前用户角色的id
      this.currentRoleId = data.data.rid
    },
    // 加载所有的角色
    async loadRoles () {
      const data = await this.$http.get('/roles')
      // console.log(data)
      this.roles = data.data
    },
    // 分配角色
    async handleSetRole () {
      await this.$http.put(`/users/${this.currentUser.id}/role`, {
        rid: this.currentRoleId
      })

      this.$message({
        type: 'success',
        message: '分配角色成功'
      })
      this.loadData()

      this.setRoleDialogVisible = false
    }
  }
}
</script>

<style lang="less">
.card {
  height: 100%;
}
</style>
