<script setup lang='ts'>

const { setting } = $(mainStore());
</script>

<template tag="div" class="logo">
  <img src="@/assets/admin.png" width="48" height="48" m="l-8px r-16px" />
  <div>后台管理系统</div>
</template>

<style lang='less' scoped>
.logo {
  display: flex;
  overflow: hidden;
  border-bottom: 1px solid var(--el-border-color);
  width: var(--aside-width, 200px);
  font-size: 16px;
  font-weight: bold;
  line-height: 48px;
  color: var(--el-text-color-primary);
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--bg-hover-color);
    cursor: pointer;
  }
}

.left .logo, .mobile .logo {
  --el-border-color: transparent;

  transition: width 0.2s;
}

// --el-menu-bg-color: #001529;
//   --el-menu-sub-bg-color: #0c2135;
//   --el-menu-hover-bg-color: transparent;
//   --el-menu-text-color: #bfcbd9;
//   --el-menu-active-color: white;
//   --el-menu-color-primary: var(--color-primary);

html:not(.dark) {
  .left .logo, .mobile .logo {
    --el-text-color-primary: white;

    background: #001529;
  }
}

</style>