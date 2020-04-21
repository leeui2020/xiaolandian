<template>
  <div>
    <el-row class="margin-bottom" type="flex" align="middle" justify="end">
      <el-button type="primary" @click="addDialogVisible = true">添加产品</el-button>
      <el-button type="danger" :disabled="selection.length === 0"
        @click="removeProducts(selection)"
      >批量删除</el-button>
    </el-row>

    <!-- 产品列表 -->
    <el-table class="margin-bottom" v-loading="loading" :data="list" stripe border
      @selection-change="selectionChangeHandler"
    >
      <el-table-column type="selection" width="55" align="center" fixed="left" />
      <el-table-column label="缩略图" width="120">
        <div class="thumbnail" slot-scope="scope">
          <img :src="scope.row.thumbnail.src">
        </div>
      </el-table-column>
      <el-table-column prop="name" label="名称" min-width="160" />
      <el-table-column prop="price" label="价格" width="160"
        align="center" :formatter="priceFormatter" />
      <el-table-column prop="createdAt" label="添加时间" width="160"
        align="center" :formatter="dateFormatter" />
      <el-table-column label="操作" align="center" min-width="160" fixed="right">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="openEditDialog(scope.row)">编辑</el-button>
          <el-button type="danger" size="mini" @click="removeProducts([scope.row])">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 产品列表END -->

    <!-- 分页 -->
    <el-pagination
      :page-size="pagesize"
      :current-page="page"
      :total="total"
      @current-change="getProductList"
    ></el-pagination>
    <!-- 分页END -->

    <!-- 媒体库弹窗 -->
    <el-dialog title="媒体库" :visible.sync="mediaDialgVisible" append-to-body>
      <lee-media ref="media" :multiple="false" v-if="mediaDialgVisible" />
      <div slot="footer">
        <el-button type="primary" @click="mediaDialogConfirm">确定</el-button>
        <el-button @click="mediaDialgVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 媒体库弹窗END -->

    <!-- 添加产品弹窗 -->
    <el-dialog title="添加产品" :visible.sync="addDialogVisible" append-to-body 
      @closed="addDialogCloseHandler">
      <el-form ref="addDialogForm" label-width="80px" label-position="left"
        :model="addDialogForm" :rules="addDialogRules">
        <el-form-item label="名称" prop="name">
          <el-input v-model="addDialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="缩略图" prop="thumbnail">
          <el-button @click="mediaDialgVisible = true">从媒体库选择</el-button>
          <span class="margin-left" v-if="currentSelectMedia">已选择</span>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model.number="addDialogForm.price">
            <span slot="append">元</span>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" :loading="addDialogLoading" @click="addDialogConfirm">确定</el-button>
        <el-button @click="addDialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 添加产品弹窗END -->

    <!-- 产品编辑弹窗 -->
    <el-dialog title="编辑产品" :visible.sync="editDialogVisible" append-to-body
      @closed="editDialogCloseHandler">
      <el-form ref="editDialogForm" label-width="80px" label-position="left"
        :model="editDialogForm" :rules="editDialogRules">
        <el-form-item label="名称" prop="name">
          <el-input v-model="editDialogForm.name"></el-input>
        </el-form-item>
        <el-form-item label="缩略图" prop="thumbnail">
          <el-button @click="mediaDialgVisible = true">从媒体库选择</el-button>
          <span class="margin-left" v-if="currentSelectMedia">已选择</span>
        </el-form-item>
        <el-form-item label="价格" prop="price">
          <el-input v-model.number="editDialogForm.price">
            <span slot="append">元</span>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" :loading="editDialogLoading" @click="editDialogConfirm">保存</el-button>
        <el-button @click="editDialogVisible = false">取消</el-button>
      </div>
    </el-dialog>
    <!-- 产品编辑弹窗END -->
  </div>
</template>

<script>
import moment from 'moment'
import LeeMedia from './Media'

export default {
  name: 'Product',
  components: {
    LeeMedia
  },
  data() {
    return {
      page: 1,
      pagesize: 10,
      total: 0,
      list: [],
      loading: false,
      selection: [],

      currentSelectMedia: null,
      mediaDialgVisible: false,

      addDialogVisible: false,
      addDialogForm: {
        name: '',
        price: 0
      },
      addDialogRules: {
        name: [{ required: true, message: '请填写产品名称' }],
        price: [{ required: true, message: '请填写产品价格' }]
      },
      addDialogLoading: false,

      editDialogVisible: false,
      editDialogForm: {
        name: '',
        price: 0
      },
      editDialogRules: {
        name: [{ required: true, message: '请填写产品名称' }],
        price: [{ required: true, message: '请填写产品价格' }]
      },
      editDialogLoading: false,
      editProductId: null
    }
  },
  async created() {
    await this.getProductList(1)
  },
  methods: {
    mediaDialogConfirm() {
      const media = this.$refs.media
      this.currentSelectMedia = media.selection[0] || null
      this.mediaDialgVisible = false
    },

    // 添加产品
    async addDialogConfirm() {
      if (this.addDialogLoading) return
      if (!await this.$refs.addDialogForm.validate()) return
      this.addDialogLoading = true
      const { name, price } = this.addDialogForm
      const { currentSelectMedia } = this
      const { data: res } = await this.$http.post('/product/add', {
        name,
        price: Math.ceil(price * 100),
        thumbnail: currentSelectMedia && currentSelectMedia._id
      })
      this.addDialogLoading = false
      if (res.status !== 'ok') {
        return this.$message.error(res.errmsg)
      }
      this.$message.success('添加成功')
      this.addDialogVisible = false
      await this.getProductList(1)
    },

    // 产品列表
    async getProductList(page = 1) {
      this.loading = true
      const { data: res } = await this.$http.post('/product/list', {
        page: Math.max(1, page),
        pagesize: this.pagesize
      })
      this.loading = false
      if (res.status === 'ok') {
        this.page = res.data.page
        this.pagesize = res.data.pagesize
        this.list = res.data.list.slice(0)
        this.total = res.data.total
        this.selection = []
      }
    },

    // 格式化价格
    priceFormatter(item) {
      return `￥${item.price / 100}`
    },
    // 格式化日期
    dateFormatter(item) {
      return moment(item.createdAt).format('YYYY/MM/DD')
    },

    // 选中产品
    selectionChangeHandler(selection) {
      this.selection = selection
    },

    // 删除产品
    removeProducts(list) {
      const products = list.map(v => v._id)
      if (products.length === 0) return
      this.$confirm('是否删除选中的产品？', '删除确认', {
        type: 'warning',
        callback: async action => {
          if (action !== 'confirm') return
          this.loading = true
          const { data: res } = await this.$http.post('/product/remove', {
            products
          })
          this.loading = false
          if (res.status !== 'ok') {
            return this.$message.error(res.errmsg)
          }
          this.$message.success('删除成功')
          await this.getProductList(
            this.list.length === 1 ? this.page - 1 : this.page
          )
        }
      })
    },

    // 编辑产品弹窗确认
    async editDialogConfirm() {
      if (!this.editProductId) return
      if (this.editDialogLoading) return
      if (!await this.$refs.editDialogForm.validate()) return
      this.editDialogLoading = true
      const { name, price } = this.editDialogForm
      const { currentSelectMedia } = this
      const { data: res } = await this.$http.post('/product/update', {
        _id: this.editProductId,
        modify: {
          name,
          price: Math.ceil(price * 100),
          thumbnail: currentSelectMedia && currentSelectMedia._id
        }
      })
      this.editDialogLoading = false
      if (res.status !== 'ok') {
        return this.$message.error(res.errmsg)
      }
      this.$message.success('更新成功');
      this.editDialogVisible = false
      await this.getProductList(this.page)
    },

    // 打开编辑产品弹窗
    openEditDialog(item) {
      this.editDialogForm.name = item.name
      this.editDialogForm.price = item.price / 100
      this.currentSelectMedia = item.thumbnail
      this.editProductId = item._id
      this.editDialogVisible = true
    },

    // 添加产品弹窗关闭
    addDialogCloseHandler() {
      this.currentSelectMedia = null
      this.$refs.addDialogForm.resetFields()
    },
    // 编辑产品弹窗关闭
    editDialogCloseHandler() {
      this.editProductId = null
      this.currentSelectMedia = null
      this.$refs.editDialogForm.resetFields()
    },
  }
}
</script>

<style lang="scss" scoped>

</style>
