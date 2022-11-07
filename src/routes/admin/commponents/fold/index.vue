<script setup lang='ts'>
import mainLayoutStore from "@/routes/admin/stores/adminLayoutStore";
const { layout, collapse } = $(mainLayoutStore());
</script>

<template tag="div" :class="['fold', layout]" @click="collapse = !collapse">
  <i-ant-design:menu-fold-outlined v-if="!collapse"></i-ant-design:menu-fold-outlined>
  <i-ant-design:menu-unfold-outlined v-else></i-ant-design:menu-unfold-outlined>
</template>

<style lang='less' scoped>
.fold {
  display: flex;
  border-bottom: 1px solid var(--el-border-color);
  padding: 12px;
  font-size: 16px;
  transition: background-color 0.2s;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: var(--el-bg-color-page);
    cursor: pointer;
  }

  &.top {
    display: none;
  }
}
</style>