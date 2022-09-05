<script lang="ts" setup></script>

<template>
  <el-main>
    <transition mode="out-in">
      <vrouter keep-alive router-key></vrouter>
    </transition>
  </el-main>
</template>

<style lang="less" scoped>
.v-enter-from,
.v-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.v-enter-from {
  transform: translateX(-30px);
}

.v-leave-active,
.v-enter-active {
  transition: all 0.333s ease;
}

.v-leave-active {
  transition-duration: 0s;
}
</style>
