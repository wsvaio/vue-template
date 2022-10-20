<script setup lang='ts'>

const { setting } = $(mainStore());
</script>

<template tag="div" :class="['logo', setting.layout, setting.collapse && 'collapse']">
  <transition>
    <div v-show="!setting.collapse || setting.layout == 'top'">后台管理系统</div>
  </transition>
</template>

<style lang='less' scoped>
.logo {
  overflow: hidden;
  border-bottom: 1px solid var(--border-color);
  padding-left: 64px;
  font-size: 16px;
  font-weight: bold;
  line-height: 48px;
  color: var(--text-color-full);
  background: url("@/assets/admin.png") no-repeat 7px center / 50px 50px;
  background-color: var(--bg-color);
  transition: background-color 0.2s ease-out;
  cursor: pointer;

  &.left {
    --bg-color: #001529;
    --text-color-full: white;

    border-bottom: none;
  }

  &.top {
    width: 200px;

    &:hover {
      background-color: var(--bg-hover-color);
    }
  }

  // &.collapse {
  //   & > div {
  //     display: none;
  //   }
  // }
}

.dark .logo.left {
  --bg-color: inherit;
}

.v-enter-active,
.v-leave-active {
  max-width: 100px;
  transition: max-width 0.2s ease-in;
}

.v-enter-from,
.v-leave-to {
  max-width: 0;
}
</style>