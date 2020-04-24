<template>
  <div class="content">
    <el-row class="margin-bottom" type="flex" align="middle" justify="end">
      <el-button type="primary" @click="addFormVisible = true">新增二维码</el-button>
      <el-button type="danger" :disabled="selection.length === 0" @click="removePaycode(selection)">批量删除</el-button>
    </el-row>

    <!-- 支付二维码列表 -->
    <el-table class="margin-bottom" :data="list" v-loading="loading" stripe border @selection-change="selectionChangeHandler">
      <el-table-column type="selection" width="55" fixed="left" />
      <el-table-column prop="qrcode" label="二维码" width="120">
        <img :src="scope.row.qrcode.src" class="qrcode" slot-scope="scope">
      </el-table-column>
      <el-table-column prop="title" label="描述" min-width="160" />
      <el-table-column prop="email" label="通知邮箱" min-width="160" />
      <el-table-column prop="isClosed" label="禁用" min-width="120">
        <el-switch slot-scope="scope" v-model="scope.row.isClosed" @change="switchClosedHandler(scope.row)" />
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" min-width="180" :formatter="dateFormatter" />
      <el-table-column label="操作" align="center" min-width="180" fixed="right">
        <el-button-group slot-scope="scope">
          <el-button type="primary" size="mini" @click="editPaycode(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="removePaycode([scope.row])">删除</el-button>
        </el-button-group>  
      </el-table-column>
    </el-table>
    <!-- 支付二维码列表END -->

    <!-- 分页 -->
    <el-pagination
      :total="total"
      :page-size="pagesize"
      :current-page="page"
      :current-change="getDataList"
    ></el-pagination>
    <!-- 分页END -->

    <!-- 新增二维码弹窗 -->
    <el-dialog title="新增二维码" :visible.sync="addFormVisible" append-to-body @closed="addFormDialogClosed">
      <el-form ref="addFormRef" label-width="80px" label-position="left" :model="addForm" :rules="addFormRules">
        <!-- 媒体 -->
        <el-form-item label="二维码" prop="qrcode">
          <el-button @click="openMediaDialog('addForm')">从媒体库选择</el-button>
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

    <!-- 编辑二维码窗口 -->
    <el-dialog title="编辑二维码" :visible.sync="editFormVisible" append-to-body @closed="editFormDialogClosed">
      <el-form ref="editFormRef" :model="editForm" :rules="addFormRules" label-width="80px" label-position="left">
        <el-form-item label="二维码" prop="qrcode">
          <el-button @click="openMediaDialog('editForm')">从媒体库选择</el-button>
          <span class="margin-left" v-if="editForm.qrcode">{{ editForm.qrcode.fileName }}</span>
        </el-form-item>
        <el-form-item label="描述" prop="title">
          <el-input v-model="editForm.title"></el-input>
        </el-form-item>
        <el-form-item label="通知邮箱" prop="email">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" :loading="editFormLoading" @click="editFormSubmitHandler">保存</el-button>
        <el-button @click="editFormVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 编辑二维码窗口END -->
  </div>
</template>

<script>
import moment from 'moment'
import LeeMediaDialog from '@/components/LeeMediaDialog'

export default {
  name: 'Paycode',
  components: {
    LeeMediaDialog
  },
  data() {
    return {

      // 数据相关
      page: 1,
      pagesize: 10,
      total: 0,
      list: [],
      loading: false,
      selection: [],

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
      addFormVisible: false,

      // 编辑二维码相关
      editForm: {
        title: '',
        email: '',
        qrcode: null
      },
      editFormLoading: false,
      editFormVisible: false,
      currentEdit: null
    }
  },
  async created() {
    await this.getDataList(1)
  },
  methods: {

    // 获取支付二维码列表
    async getDataList(page) {
      this.loading = true
      const { data: res } = await this.$http.post('/paycode/list', {
        page: Math.max(1, page),
        pagesize: this.pagesize
      })
      this.loading = false
      if (res.status === 'ok') {
        this.page = res.data.page
        this.pagesize = res.data.pagesize
        this.total = res.data.total
        this.list = res.data.list
        this.selection = []
      }
    },

    // 编辑支付二维码
    editPaycode(item) {
      this.editForm.title = item.title
      this.editForm.email = item.email
      this.editForm.qrcode = item.qrcode
      this.currentEdit = item
      this.editFormVisible = true
    },

    // 删除支付二维码
    removePaycode(list) {
      const _id = list.map(item => item._id)
      if (_id.length === 0) return
      this.$confirm('是否删除支付二维码？', '删除提示', {
        type: 'warning',
        callback: async action => {
          if (action !== 'confirm') return
          this.loading = true
          const { data: res } = await this.$http.post('/paycode/remove', { _id })
          this.loading = false
          if (res.status !== 'ok') {
            return this.$message.error(res.errmsg)
          }
          this.$message.success('删除成功')
          await this.getDataList(this.list.length > 1 ? this.page : this.page - 1)
        }
      })
    },

    // 切换二维码禁用状态
    async switchClosedHandler(item) {
      const { data: res } = await this.$http.post('/paycode/edit', {
        _id: item._id,
        modify: { isClosed: item.isClosed }
      })
      if (res.status !== 'ok') {
        item.isClosed = !item.isClosed
        this.$message.error(res.errmsg)
        return
      }
      this.$message.success('保存成功')
    },

    // 打开媒体库
    openMediaDialog(type) {
      this.$refs.media.open()
      this._mediaSelectHandler = item => {
        this[type].qrcode = item
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
    editFormDialogClosed() {
      this.currentEdit = null
      this.$refs.editFormRef.resetFields()
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
    },

    // 编辑二维码窗口提交事件
    async editFormSubmitHandler() {
      if (this.editFormLoading) return
      if (!await this.$refs.editFormRef.validate()) return
      this.editFormLoading = true
      const { title, email, qrcode } = this.editForm
      const { data: res } = await this.$http.post('/paycode/edit', {
        _id: this.currentEdit._id,
        modify: { title, email, qrcode: qrcode._id }
      })
      this.editFormLoading = false
      if (res.status !== 'ok') {
        return this.$message.error(res.errmsg)
      }
      this.editFormVisible = false
      this.$message.success('保存成功')
      await this.getDataList(this.page)
    },

    // 格式化日期
    dateFormatter(row, column, cellValue) {
      return moment(cellValue).format('YYYY/MM/DD')
    },

    // 选择列表变化事件
    selectionChangeHandler(selection) {
      this.selection = selection
    }
  }
}
</script>

<style lang="scss" scoped>
  .qrcode {
    width: 60px;
  }
</style>
