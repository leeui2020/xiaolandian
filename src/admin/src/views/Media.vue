<template>
  <div>
    <el-row class="margin-bottom" type="flex" align="middle" justify="end">
      <el-button type="primary" @click="uploadFiles" :loading="!!uploading">
        {{ uploading ? `上传中(${uploading})` : '上传文件' }}
      </el-button>
      <el-button type="danger" :disabled="selection.length === 0" @click="removeFiles">删除文件</el-button>
    </el-row>

    <!-- 文件列表 -->
    <el-table class="margin-bottom"
      :data="list"
      :highlight-current-row="!multiple"
      v-loading="loading"
      stripe
      border
      @selection-change="selectionChangeHandler"
      @current-change="currentChangeHandler"
    >
      <el-table-column type="selection" width="55" align="center" v-if="multiple" />
      <el-table-column type="index" width="55" align="center" v-else />
      <el-table-column label="缩略图" width="120" align="center">
        <div class="thumbnail" slot-scope="scope">
          <img :src="scope.row.src">
        </div>
      </el-table-column>
      <el-table-column
        prop="fileName"
        label="文件名"
        min-width="120"
        align="center"
        show-overflow-tooltip />
      <el-table-column
        prop="createdAt"
        label="上传日期"
        width="160"
        align="center"
        :formatter="dateFomatter" />
      <el-table-column
        prop="size"
        label="大小"
        width="160"
        align="center"
        :formatter="sizeFormatter" />
    </el-table>

    <!-- 文件列表END -->
    <el-pagination :page-size="pagesize"
      :total="total"
      :current-page="page"
      @current-change="getFileList"
    />
  </div>
</template>

<script>
import moment from 'moment'
import prettyBytes from 'pretty-bytes'
import Media from '@/libs/media'
import { chooseFiles } from '@/libs/utils'

export default {
  name: 'Media',
  props: {
    accept: {
      type: String,
      default: 'image/png, image/jpeg, image/jpg'
    },

    multiple: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      uploading: false,
      page: 1,
      pagesize: 10,
      total: 0,
      list: [],
      selection: [],
      loading: false
    };
  },
  async created() {
    await this.getFileList(1)
  },
  methods: {

    async uploadFiles() {
      if (this.uploading) return
      const { accept } = this
      /** @type {FileList} */
      const files = await chooseFiles({ accept  })
      const file = files[0]
      if (file.size > 1024 * 1024 * 2) {
        return this.$message.error('文件大小限制2MB以内')
      }

      this.uploading = '0%'
      const formData = new FormData()
      formData.append('file', file)
      formData.append('type', file.type)
      formData.append('size', file.size)
      const { data: res } = await this.$http.post('/media/upload', formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        onUploadProgress: e => {
          this.uploading = ((e.loaded / e.total * 100) | 0) + '%'
        }
      })
      this.uploading = null
      if (res.status !== 'ok') {
        this.$message.error(res.errmsg)
      } else {
        this.$message.success('上传成功');
        await this.getFileList(1)
      }
    },

    async getFileList(page = 1) {
      this.loading = true
      const { data: res } = await this.$http.post('/media/getList', {
        page: Math.max(1, page),
        pagesize: this.pagesize
      })
      this.loading = false
      if (res.status === 'ok') {
        this.page = res.data.page
        this.pagesize = res.data.pagesize
        this.total = res.data.total
        this.list = res.data.list.slice(0)
        this.selection = []
      }
    },

    async refreshList() {
      await this.getFileList(this.page)
    },

    removeFiles() {
      const medias = this.selection.map(v => v._id)
      if (medias.length === 0) return
      this.$confirm('是否删除选中的媒体文件？', '删除确认', {
        type: 'warning',
        callback: async action => {
          if (action !== 'confirm') return
          this.loading = true
          const { data: res } = await this.$http.post('/media/remove', { medias })
          this.loading = false
          if (res.status !== 'ok') {
            return this.$message.error(res.errmsg)
          }
          this.$message.success('删除成功')
          await this.getFileList(
            this.list.length === 1 ? this.page - 1 : this.page
          )
        }
      })
    },

    dateFomatter(item) {
      return moment(item.createdAt).format('YYYY/MM/DD')
    },
    sizeFormatter(item) {
      return prettyBytes(item.size)
    },

    selectionChangeHandler(selection) {
      this.selection = selection
    },

    currentChangeHandler(item) {
      if (!this.multiple) {
        this.selection = item ? [item] : []
      }
    }
  },
  watch: {
    selection(list) {
      this.$emit('selection-change', list)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
