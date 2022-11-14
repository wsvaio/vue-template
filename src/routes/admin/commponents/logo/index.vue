<script setup lang='ts'>
import mainLayoutStore from "@/routes/admin/stores/adminLayoutStore";
const { layout } = $(mainLayoutStore());
const { VITE_DOCUMENT_TITLE } = import.meta.env;
</script>

<template tag="div" class="logo" @click="layout = layout == 'top' ? 'left' : 'top'">
  <img src="@/assets/admin.png" width="48" height="48" m="x-8px" />
  <div m="r-8px" overflow="hidden" max="h-40px">{{ VITE_DOCUMENT_TITLE }}</div>
</template>

<style lang='less' scoped>
.logo {
  display: flex;
  overflow: hidden;
  border-bottom: 1px solid var(--el-border-color);
  width: var(--aside-width, 200px);
  font-size: 16px;
  font-weight: bold;
  line-height: 20px;
  color: var(--el-text-color-primary);
  transition: background-color 0.2s;
  align-items: center;

  &:hover {
    background-color: var(--el-bg-color-page);
    cursor: pointer;
  }
}

.collapse:not(.mobile) .logo {
  padding: 0;
  justify-content: center;

  & > div {
    display: none;
  }
}

.left .logo, .mobile .logo {
  --el-border-color: transparent;

  transition: width 0.2s;
}

html:not(.dark) {
  .left .logo, .mobile .logo {
    --el-text-color-primary: white;

    background: #001529;
  }
}

</style>
