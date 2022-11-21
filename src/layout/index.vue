<template>
  <el-container class="menu-box">
    <el-aside>
      <SiderBar></SiderBar>
    </el-aside>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <AppMain></AppMain>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup>
import Header from './header/Header.vue'
import SiderBar from './siderbar/SiderBar.vue'
import AppMain from './main/AppMain.vue'
</script>

<style scoped>
.menu-box {
  width: 100vw;
  height: 100vh;
}

.el-aside {
  height: 100vh;
  width: auto;
  background-color: #7C3AED;
  color: #fff;
}

.el-header {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-bottom: 1px solid var(--el-border-color);
}
</style>