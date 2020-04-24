<template>
  <div class="content">
    <el-row class="margin-bottom" type="flex" align="middle" justify="end">
      <el-button type="primary" @click="addFormVisible = true">新增二维码</el-button>
    </el-row>

    <!-- 新增二维码弹窗 -->
    <el-dialog title="新增二维码" :visible.sync="addFormVisible" append-to-body @closed="addFormDialogClosed">
      <el-form ref="addFormRef" label-width="80px" label-position="left" :model="addForm" :rules="addFormRules">
        <!-- 媒体 -->
        <el-form-item label="二维码" prop="qrcode">
          <el-button @click="openMediaDialog('add')">从媒体库选择</el-button>
          <span class="margin-left" v-if="addForm.qrcode">{{ addForm.qrcode.fileName }}</span>
        </el-form-item>
        <!-- 描述 -->
        <el-form-item label="描述" prop="title">
          <el-input v-model="addForm.title"></el-input>
        </el-form-item>
        <!-- 邮箱 -->
        <el-form-item label="通知邮箱" prop="email">
          <el-input v-model="addForm.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" :loading="addFormLoading" @click="addFormSubmitHandler">保存</el-button>
        <el-button @click="addFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 新增二维码弹窗END -->

    <!-- 媒体库窗口 -->
    <LeeMediaDialog ref="media" @select="mediaSelectHandler" />
    <!-- 媒体库窗口END -->
  </div>
</template>

<script>
import LeeMediaDialog from '@/components/LeeMediaDialog'

export default {
  name: 'Paycode',
  components: {
    LeeMediaDialog
  },
  data() {
    return {

      // 新增二维码相关
      addForm: {
        title: '',
        email: '',
        qrcode: null
      },
      addFormRules: {
        title: [{ required: true, message: '请填写描述' }],
        email: [
          { required: true, message: '请填写通知邮箱' },
          { type: 'email', message: '邮箱格式错误' }
        ],
        qrcode: [{ required: true, message: '请选择二维码' }]
      },
      addFormLoading: false,
      addFormVisible: false
    }
  },
  methods: {

    // 获取支付二维码列表
    async getDataList(page) {

    },

    // 打开媒体库
    openMediaDialog(type) {
      this.$refs.media.open()
      if (type === 'add') {
        this._mediaSelectHandler = item => {
          this.addForm.qrcode = item
        }
      }
    },

    // 媒体库选择事件
    mediaSelectHandler(item) {
      if (typeof this._mediaSelectHandler === 'function') {
        this._mediaSelectHandler.call(this, item)
      }
    },

    // 新增二维码窗口关闭事件
    addFormDialogClosed() {
      this.$refs.addFormRef.resetFields()
      delete this._mediaSelectHandler
    },

    // 新增二维码窗口提交事件
    async addFormSubmitHandler() {
      if (this.addFormLoading) return
      if (!await this.$refs.addFormRef.validate()) return
      this.addFormLoading = true
      const { title, email, qrcode } = this.addForm
      const { data: res } = await this.$http.post('/paycode/add', {
        title,
        email,
        qrcode: qrcode._id
      })
      this.addFormLoading = false
      if (res.status !== 'ok') {
        return this.$message.error(res.errmsg)
      }
      this.$message.success('新增成功')
      this.addFormVisible = false
      await this.getDataList(1)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
