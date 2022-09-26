<script lang="ts" setup></script>

<template>
  <el-main>
    <!-- <transition mode="out-in">
      <vrouter keep></vrouter>
    </transition> -->

    <router-view #="{ Component }">
      <transition mode="out-in">
        <keep-alive>
          <component :is="Component"></component>
        </keep-alive>
      </transition>
    </router-view>
  </el-main>
</template>

<style lang="less" scoped>
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
  transition: all .2s ease;
}

// .v-leave-active {
//   transition-duration: 0s;
// }
</style>
