<script lang="ts" setup>
import { adminRoutes } from "@/routes";
import Nav from "./components/nav/index.vue";

const route = useRoute();
const { setting } = $(mainStore());
const active = computed(() => {
  if (route.matched[route.matched.length - 1].meta.icon) return String(route.name);
  else return String(route.matched[route.matched.length - 2].name);
});

</script>

<template>
  <el-menu class="menu" :collapse="setting.layout != 'top' && setting.collapse" :default-active="active"
    :mode="setting.layout == 'top' ? 'horizontal' : 'vertical'">
    <div flex="1"></div>
    <Nav :list="adminRoutes"></Nav>
  </el-menu>
</template>

<style lang="less">
.menu {
  border-right: none;
}

.left .menu, .mobile .menu {
  overflow: hidden;
  width: var(--aside-width, 200px);

  .el-menu-item.is-active {
    color: var(--el-menu-text-active-color);
    background: var(--el-color-primary);
  }

  .el-menu-item:hover, .el-sub-menu__title:hover, .el-sub-menu.is-active > .el-sub-menu__title {
    color: var(--el-menu-text-active-color);
  }

  .collapse .el-sub-menu.is-active > .el-sub-menu__title {
    color: var(--el-menu-text-active-color);
    background: var(--el-color-primary);
  }
}
</style>
