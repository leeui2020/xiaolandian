<template>
  <el-submenu :index="item.id" v-if="hasChild">
    <template slot="title">
      <span class="menuicon" :class="item.icon" v-if="item.icon"></span>
      <span>{{ item.name }}</span>
    </template>
    <lee-menu-item v-for="(v, k) of item.children" :item="v" :key="k" />
  </el-submenu>
  <el-menu-item :index="item.id" v-else>
    <span class="menuicon" :class="item.icon" v-if="item.icon"></span>
    <span slot="title">{{ item.name }}</span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'LeeMenuItem',
  props: {
    item: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    hasChild() {
      const { children } = this.item
      return children && children.length
    }
  }
}
</script>

<style lang="scss" scoped>
.menuicon {
  margin-right: 10px;
}
</style>
