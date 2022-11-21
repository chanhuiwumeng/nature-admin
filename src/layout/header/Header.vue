<template>
  <!-- 动态组件的使用 -->
  <el-icon :size="24" @click="changeCollapse">
    <component :is="isExpand ? Expand : Fold"></component>
  </el-icon>
  <!-- 面包屑 -->
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">homepage</el-breadcrumb-item>
    <el-breadcrumb-item><a href="/">promotion management</a></el-breadcrumb-item>
    <el-breadcrumb-item>promotion list</el-breadcrumb-item>
    <el-breadcrumb-item>promotion detail</el-breadcrumb-item>
  </el-breadcrumb>
  <div class="settings">
    <el-tooltip class="box-item" effect="dark" content="刷新缓存" placement="bottom">
      <el-button :icon="Refresh" />
    </el-tooltip>
    <el-tooltip class="box-item" effect="dark" content="全屏" placement="bottom">
      <el-button :icon="Rank" />
    </el-tooltip>
    <el-tooltip class="box-item" effect="dark" content="锁屏" placement="bottom">
      <el-button :icon="Unlock" />
    </el-tooltip>
    <!-- 徽章 -->
    <el-tooltip class="box-item" effect="dark" content="通知" placement="bottom">
      <el-badge :value="3" class="item">
        <el-icon size="24">
          <Bell />
        </el-icon>
      </el-badge>
    </el-tooltip>

  </div>
  <!-- 下拉菜单 -->
  <div class="info">
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar src="https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif" />
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item :icon="Plus">首页</el-dropdown-item>
          <el-dropdown-item :icon="CirclePlusFilled">
            Action 2
          </el-dropdown-item>
          <el-dropdown-item :icon="CirclePlus">个人信息</el-dropdown-item>
          <el-dropdown-item :icon="Check">修改密码</el-dropdown-item>
          <el-dropdown-item :icon="CircleCheck">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
  <el-tooltip class="box-item" effect="dark" content="系统设置" placement="bottom">
    <el-button :icon="Tools" style='border:none;font-size:24px' @click="drawer = true" />
  </el-tooltip>
  <el-drawer v-model="drawer" title="修改系统主题" :with-header="false" show-close>
    <span>Hi there!</span>
  </el-drawer>
</template>

<script setup>
import {
  Expand, Fold, Rank, Unlock, Lock, Refresh, Bell, ArrowDownBold,
  ArrowDown,
  Check,
  CircleCheck,
  CirclePlus,
  CirclePlusFilled,
  Plus, Tools
} from '@element-plus/icons-vue'
import { ref, getCurrentInstance, reactive, shallowRef } from 'vue'
// *获取当期的vue实例
const instance = getCurrentInstance();

// *控制左侧菜单的折叠和展开
let isExpand = ref(false)

let icon = shallowRef(Fold)
// *控制主题修改的抽屉显示隐藏
const drawer = ref(false)
// *控制左侧菜单的折叠和展开
let changeCollapse = () => {
  isExpand.value = !isExpand.value
  instance.proxy.$mitt.emit('changeCollapse', isExpand.value)
}

</script>

<style scoped>
#expand {
  height: 100%;
  border: none;
  padding: 0;
  width: 50px;
  font-size: 24px;
}

.el-button:focus,
.el-button:hover {
  color: #333;
  background: #F9FAFB;
}


.el-breadcrumb {
  margin-left: 20px;
  width: 65%;
}

.settings {
  width: 280px;
}

.settings .el-button {
  border: none;
  font-size: 24px;
}

.item {
  margin-top: 6px;
}

.info {
  width: 80px;
  display: flex;
  justify-content: center;
}
</style>