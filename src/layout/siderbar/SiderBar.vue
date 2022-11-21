<template>
  <el-menu :default-active="activeIndex" class="el-menu-vertical-demo" :collapse="isCollapse" unique-opened router>
    <SiderBarItem :menuList='menus'></SiderBarItem>
  </el-menu>
</template>


<script setup>
import SiderBarItem from '@/layout/siderbar/SiderBarItem.vue'
import { useRouter, useRoute } from 'vue-router'
import { usePermissionStore } from '@/stores/permission.js'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
} from '@element-plus/icons-vue'
import { ref, getCurrentInstance, onMounted, computed } from 'vue'
// 路由对象
const router = useRouter()
const route = useRoute()
const permissionStore = usePermissionStore()
const instance = getCurrentInstance();
const isCollapse = ref(false)
console.log(isCollapse.value);

onMounted(() => {
  // *监听事件改变
  instance.proxy.$mitt.on('changeCollapse', (data) => {
    console.log('----------on----------', data, isCollapse.value);
    isCollapse.value = data
  })
})
// 异步菜单树生成
let menus = computed(() => {
  // 获取

  let newMenus = permissionStore.getRoutes.filter((m) => { return m.name && !m.hidden })
  console.log("🚀 ~ file: SiderBar.vue ~ line 69 ~ menus ~ menus", newMenus)
  return newMenus
})
// *激活的路由
const activeIndex = computed(() => {
  const { path } = route;
  return path;
})

</script>

<style  scoped>
.el-scrollbar {
  height: 100vh;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu-vertical-demo,
.el-menu-item,
.el-menu {
  background-color: #7C3AED;
  color: #fff;
}

:deep(.el-menu) {
  background-color: #7C3AED;
}

:deep(.el-menu:hover) {
  background-color: #C4B5FD;
}

:deep(.el-menu-item:hover) {
  background: #C4B5FD;
}

:deep(.el-sub-menu__title:hover) {
  background-color: #C4B5FD;
}

:deep(.el-sub-menu__title) {
  color: #fff;
}
</style>