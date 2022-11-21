<template>
  <template v-for="menu in menuList" :key="menu.path">
    <el-sub-menu v-if="menu.children && menu.children.length > 0" :index="menu.path" :key="menu.path">
      <template #title>
        <!-- 动态组件的使用方法 -->
        <el-icon>
          <component class="icons" :is="menu.meta.icon" />
        </el-icon>
        <span>{{ menu.meta.title }}</span>
      </template>
      <sider-bar-item :menuList="menu.children"></sider-bar-item>
    </el-sub-menu>
    <el-menu-item style="color: #f4f4f5" v-else :index="menu.path">
      <el-icon>
        <!-- 动态组件的使用方法 -->
        <component class="icons" :is="menu.meta.icon" />
      </el-icon>
      <template #title>{{ menu.meta.title }}</template>
    </el-menu-item>
  </template>
</template>

<script setup>
import {
  User, Help,
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { defineProps } from 'vue'
// * 接受父组件传递过来的值
defineProps(['menuList'])

</script>

<style  scoped>
.icons {
  width: 20px;
  height: 20px;
}
</style>