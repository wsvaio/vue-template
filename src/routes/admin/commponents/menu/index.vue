<script lang="ts" setup>
import { adminRoutes } from "@/routes";
import RootNav from "../root-nav/index.vue";

const route = useRoute();

const active = computed(() => {
  if (route.matched[route.matched.length - 1].meta.icon) return String(route.name);
  else return String(route.matched[route.matched.length - 2].name);
});

const { setting } = $(mainStore());

</script>

<template>
  <el-menu :class="['menu', setting.layout, setting.collapse && 'collapse']" :default-active="active"
    :collapse="setting.layout != 'top' && setting.collapse"
    :mode="setting.layout == 'top' ? 'horizontal' : 'vertical'">
    <div flex="1"></div>
    <root-nav :list="adminRoutes"></root-nav>
  </el-menu>
</template>

<style lang="less">
.el-menu {
  --el-menu-width: 200px;

  border-right: none;

  &.left {
    overflow-y: auto;
  }

  &:not(.el-menu--collapse) {
    width: var(--el-menu-width);
  }

  &.top {
    --el-menu-width: inherit;
  }

  &.left .el-menu-item {
    &.is-active {
      color: var(--el-menu-active-color);
      background: var(--el-menu-color-primary);
    }
  }

  .el-menu-item:hover, .el-sub-menu__title:hover {
    color: var(--el-menu-active-color);
  }

  .el-sub-menu {
    &.is-active > .el-sub-menu__title {
      color: var(--el-menu-active-color);
    }

    .el-menu {
      --el-menu-bg-color: var(--el-menu-sub-bg-color);
    }
  }

  &.el-menu--collapse .is-active {
    background: var(--el-menu-color-primary);
  }

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
