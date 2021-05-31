<template>
  <div class="login_contanier">
    <div class="login_box">
      <div class="info">
        <div class="login_img"><img src="../assets/logo.png" alt="" /></div>
        <div class="title"><h1>用户登录</h1></div>
        <el-form ref="loginform" :model="loginform" :rules="rules">
          <el-form-item class="loginform" prop="username">
            <el-input
              v-model="loginform.username"
              prefix-icon="el-icon-user-solid"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>
          <el-form-item class="loginform" prop="password">
            <el-input
              v-model="loginform.password"
              prefix-icon="el-icon-lock"
              type="password"
              placeholder="请输入密码"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('loginform')"
              >登录</el-button
            >
            <el-button @click="resetForm('loginform')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data() {
    return {
      loginform: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 3,
            max: 10,
            message: '长度在 3 到 10 个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (!valid) return false
        let params = new URLSearchParams()
        params.append('username', this.loginform.username)
        params.append('password', this.loginform.password)
        const { data } = await this.$http.post('/login', params)
        if (data.Token) {
          window.sessionStorage.setItem('token', data.Token)
          this.$router.push('/home')
        } else {
          this.$message.error(data.msg)
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login_contanier {
  background: royalblue;
  overflow: hidden;
  height: 100%;
  position: relative;
  .login_box {
    width: 520px;
    height: 500px;
    background: #fff;
    border-radius: 10px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .info {
      position: relative;
      .login_img {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        border: 1px solid #e4e4e4;
        margin: 0 auto;
        box-sizing: border-box;
        padding: 10px;
        margin-top: -100px;
        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background: gainsboro;
        }
      }
      .loginform {
        box-sizing: border-box;
        padding: 0 30px;
        margin-top: 50px;
      }
    }
  }
}
</style>
