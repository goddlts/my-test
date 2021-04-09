<template>
  <div class="login-wrap">
    <el-form
      :model="formData"
      class="login-form"
      label-position="top"
      label-width="80px"
      >
      <h2>用户登录</h2>
      <el-form-item label="用户名">
        <el-input v-model="formData.username" clearable></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="formData.password" show-password clearable></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" @click="handleLogin">登 录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      formData: {
        username: 'admin',
        password: '123456'
      }
    }
  },
  methods: {
    handleLogin () {
      this.$http
        .post('/login', this.formData)
        .then(res => {
          const { data } = res
          const token = data.token
          // 成功
          this.$message({
            message: '登录成功',
            type: 'success'
          })
          // 把token存储到本地存储
          window.localStorage.setItem('token', token)
          // 跳转到首页
          this.$router.push('/')
        })
        .catch(err => {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="less">
.login-wrap {
  background-color: #324152;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  .login-form {
    background-color: #fff;
    width: 400px;
    padding: 30px;
    border-radius: 5px;

    .login-btn {
      width: 100%;
    }
  }
}
</style>
