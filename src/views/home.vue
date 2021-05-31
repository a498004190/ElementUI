<template>
  <el-container class="home_contanier">
    <el-header class="header">
      <h2>后台管理系统</h2>
      <el-button type="primary" @click="logout">退出</el-button>
    </el-header>
    <el-container>
      <el-aside :style="isCollapse ? 'width:66px' : 'width:200px'">
        <div class="toggle-button" @click="ToggleMenu">|||</div>
        <el-menu
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          unique-opened
          router
          :collapse="isCollapse"
          :collapse-transition="false"
          :default-active="this.$route.path"
        >
          <el-submenu
            :index="item.id + ''"
            v-for="item in menuList"
            :key="item.id"
          >
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span>{{ item.title }}</span>
            </template>
            <el-menu-item
              :index="'/' + subitem.path"
              v-for="subitem in item.children"
              :key="subitem.id"
              >{{ subitem.title }}</el-menu-item
            >
          </el-submenu>
          <!-- <el-menu-item :index="item.id + ''">
                <i class="el-icon-setting"></i>
                <span slot="title">{{ item.title }}</span>
              </el-menu-item> -->
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'home',
  data() {
    return {
      isCollapse: false
    }
  },
  created() {
    this.$store.dispatch('home/GetMenuList')
  },
  computed: {
    ...mapState('home', ['menuList'])
  },
  methods: {
    handleOpen(key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath)
    },
    logout() {
      window.sessionStorage.clear()
      this.$router.push('/login')
    },
    ToggleMenu() {
      console.log(this.$route.path)
      this.isCollapse = !this.isCollapse
    }
  }
}
</script>

<style lang="less" scoped>
.home_contanier {
  height: 100%;
  .header {
    height: 70px;
    background: deepskyblue;
    color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 20px;
  }
  .el-aside {
    color: #333;
    text-align: center;
    text-align: left;
    border: 1px solid #e4e4e4;
    .el-menu {
      border: 0;
    }
    .toggle-button {
      text-align: center;
      padding: 5px 0;
      background: #e4e4e4;
      &:hover {
        cursor: pointer;
      }
    }
  }
}
</style>
