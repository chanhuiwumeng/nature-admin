<template>
  <router-view v-slot="{ Component }">
    <KeepAlive>
      <component :is="Component">
      </component>
    </KeepAlive>
  </router-view>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>