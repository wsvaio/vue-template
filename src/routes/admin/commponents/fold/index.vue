<script setup lang='ts'>
const { setting } = $(mainStore());
</script>

<template tag="div" :class="['fold', setting.layout]" @click="setting.collapse = !setting.collapse">
  <i-ant-design:menu-fold-outlined v-if="!setting.collapse"></i-ant-design:menu-fold-outlined>
  <i-ant-design:menu-unfold-outlined v-else></i-ant-design:menu-unfold-outlined>
</template>

<style lang='less' scoped>
.fold {
  display: flex;
  border-bottom: 1px solid var(--border-color);
  padding: 12px;
  font-size: 16px;
  transition: background-color 0.2s;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--bg-hover-color);
    cursor: pointer;
  }

  &.top {
    display: none;
  }
}
</style>