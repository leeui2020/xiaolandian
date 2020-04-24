<template>
  <el-dialog title="媒体库" :visible.sync="visible" append-to-body>
    <lee-media ref="media" :multiple="false" v-if="visible" />
    <div slot="footer">
      <el-button type="primary" @click="confirmHandler">确定</el-button>
      <el-button @click="visible = false">取消</el-button>
    </div>
  </el-dialog>
</template>

<script>
import LeeMedia from '@/views/Media'

export default {
  name: 'LeeMediaDialog',
  components: {
    LeeMedia
  },
  data() {
    return {
      visible: false
    }
  },
  methods: {
    confirmHandler() {
      const media = this.$refs.media
      this.$emit('select', media.selection[0] || null)
      this.visible = false
    },

    open() {
      this.visible = true
    },

    close() {
      this.visible = false
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
