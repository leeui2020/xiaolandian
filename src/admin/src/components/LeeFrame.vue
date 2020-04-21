<template>
  <el-container class="frame">
    <el-aside width="220px">
      <!-- 用户信息面板 -->
      <section class="user">
        <el-row type="flex" align="middle">
          <div class="user-email">{{ email }}</div>
          <div class="user-logout fa fa-sign-out" @click="logoutHandler"></div>
        </el-row>
      </section>
      <!-- 用户信息面板End -->
      <el-menu background-color="#545c64"
        text-color="#fff"
        active-text-color="#409EFF"
        :default-active="activeMenu"
        unique-opened
        router
      >
        <lee-menu-item v-for="(v, k) of menu" :item="v" :key="k" />
      </el-menu>
    </el-aside>
    <el-main>
      <h1 class="caption" v-if="title">{{ title }}</h1>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import LeeMenuItem from './LeeMenuItem'

export default {
  name: 'LeeFrame',
  components: {
    LeeMenuItem
  },
  computed: {
    title() {
      return this.$route.meta.title
    },
    activeMenu() {
      return this.$route.path
    },
    ...mapState(['menu']),
    ...mapState('user', ['email'])
  },
  methods: {
    logoutHandler() {
      this.$confirm('确定要退出登录吗？', '退出登录', {
        type: 'warning',
        callback: action => {
          if (action !== 'confirm') return
          this.logout()
        }
      })
    },

    ...mapActions('user', ['logout'])
  }
}
</script>

<style lang="scss" scoped>
.frame {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: fixed;

  > .el-aside {
    background-color: $bg-color-menu;
  }

  .el-menu {
    border: none;
  }

  .caption {
    $height: 40px;

    height: $height;
    line-height: $height;
    margin: 0 0 20px;
    font-weight: 20px;
    position: relative;

    &::after {
      content: '';
      width: 50px;
      height: 5px;
      border-radius: 5px;
      background-color: $color-primary;
      position: absolute;
      bottom: 0;
      left: 0;
    }
  }
}

.user {
  $height: 40px;
  padding: 10px;
  color: $color-grey;

  > .el-row {
    height: $height;
    background-color: rgb(67, 74, 80);
    border-radius: 2px;
    padding: 0 10px;
  }

  &-email {
    flex: 1;
    width: 0;
    text-align: center;
    @include line-cut;
  }

  &-logout {
    cursor: pointer;
    margin-left: 5px;
  }
}
</style>
