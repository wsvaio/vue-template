<script setup lang='ts'>
const { nameList } = $(mainStore());
</script>

<template>
  <router-view #="{ Component }">
    <keep-alive :include="[...nameList]">
      <component :is="Component"></component>
    </keep-alive>
  </router-view>
</template>

<style lang='less' scoped>

</style>
