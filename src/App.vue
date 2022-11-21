<template>
  <router-view></router-view>
</template>
<script setup>

</script>

<style >
/* 改变进度条的颜色 */
#nprogress .bar {
  /* background: #f811b2 !important; */
  background-color: #00DBDE !important;
  background-image: linear-gradient(90deg, #00DBDE 0%, #FC00FF 100%) !important;
  height: 4px !important;
}
</style>
