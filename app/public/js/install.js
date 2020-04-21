window.addEventListener('load', function() {
  new Vue({
    data() {
      return {
        form: {
          email: '',
          nickName: '',
          password: '',
          repassword: '',
        },
        rules: {
          email: [
            { required: true, message: '请填写邮箱' },
            { type: 'email', message: '邮箱格式错误' },
          ],
          nickName: [{ required: true, message: '请填写昵称' }],
          password: [{ required: true, message: '请填写密码' }],
          repassword: [{ validator: (rule, value, cb) => {
            cb(value !== this.form.password ? new Error('两次密码不匹配') : '');
          } }],
        },
        loading: false,
      };
    },
    methods: {
      async confirmHandler() {
        if (this.loading) return
        if (!await this.$refs.form.validate()) return
        this.loading = true
        const { email, nickName, password } = this.form
        const { data: res } = await axios.post('/user/createAdmin', {
          email,
          nickName,
          password,
        });
        this.loading = false
        if (res.status !== 'ok') {
          this.$message.error(res.errmsg)
        } else {
          window.open(res.redirectUrl, '_self');
        }
      }
    },
  }).$mount('.form');
});
