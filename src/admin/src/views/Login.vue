<template>
  <el-form ref="form" class="form" :model="form" :rules="rules">
    <h1 class="h1">登录管理后台</h1>
    <el-form-item prop="email">
      <el-input v-model="form.email" placeholder="邮箱"></el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input v-model="form.password" placeholder="密码" type="password"></el-input>
    </el-form-item>
    <el-row type="flex" justify="end">
      <el-button type="primary" :loading="loading" @click="confirmHandler">登录</el-button>
    </el-row>
  </el-form>
</template>

<script>
import {
  setToken,
  getStorage,
  setStorage
} from '@/libs/utils'
import { mapMutations } from 'vuex'

export default {
  name: 'Login',
  data() {
    return {
      form: getStorage('lastLogin', {
        email: '',
        password: ''
      }),
      rules: {
        email: [
          { required: true, message: '请填写邮箱' },
          { type: 'email', message: '邮箱格式错误', trigger: 'blur' }
        ],
        password: [{ required: true, message: '请输入密码' }]
      },
      loading: false
    }
  },
  methods: {
    async confirmHandler() {
      if (this.loading) return
      if (!await this.$refs.form.validate()) return
      this.loading = true
      const { email, password } = this.form
      const { data: res } = await this.$http.post('/user/login', { email, password })
      this.loading = false
      if (res.status !== 'ok') {
        this.$message.error(res.errmsg)
      } else {
        const { token, nickName } = res.data
        setToken(token)
        setStorage('lastLogin', { email, password })
        setStorage('userState', { email, nickName })
        this.setUserState({ email, nickName })
        this.$router.push({ name: 'Index' })
      }
    },

    ...mapMutations('user', {
      setUserState: 'setState'
    })
  }
}
</script>

<style lang="scss" scoped>
.form {
  top: 50%;
  left: 50%;
  width: 400px;
  padding: 40px 20px;
  position: absolute;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0 0 1px rgba(0, 0, 0, .15);
  border-radius: 2px;
  transform: translate(-50%, -50%);

  > .h1 {
    font-size: 20px;
    font-weight: 600;
    margin: 0 0 20px;
  }
}
</style>
