<script setup lang='ts'>
</script>

<template tag="div" class="main">
  <router-view #="{ Component }">
    <transition mode="out-in">
      <keep-alive>
        <component :is="Component"></component>
      </keep-alive>
    </transition>
  </router-view>
</template>

<style lang='less' scoped>
.main {
  overflow: auto;
  padding: 16px;
  background: var(--main-bg-color);
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(10%);
}

.v-enter-from {
  transform: translateX(-10%);
}

.v-leave-active,
.v-enter-active {
  transition: all 0.2s ease;
}

</style>