<script lang="ts" setup>
import { adminRoutes } from "@/routes";

import RootNav from "../root-nav/index.vue";

const state = reactive({ isCollapse: false });

const route = useRoute();

function changeCollapse() {
  state.isCollapse = !state.isCollapse;
}

const active = computed(() => {
  if (route.matched[route.matched.length - 1].meta.icon) return String(route.name);
  else return String(route.matched[route.matched.length - 2].name);
});
</script>

<template>
  <el-aside class="layout-aside" :width="state.isCollapse ? `64px` : `200px`">
    <div class="logo"></div>

    <el-menu :default-active="active" :collapse="state.isCollapse">
      <root-nav :list="adminRoutes"></root-nav>
    </el-menu>

    <div class="fold" @click="changeCollapse">
      <el-icon>
        <i-ep:arrow-right-bold v-if="state.isCollapse"></i-ep:arrow-right-bold>
        <i-ep:arrow-left-bold v-else></i-ep:arrow-left-bold>
      </el-icon>
    </div>
  </el-aside>
</template>

<style lang="less">
.layout-aside {
  box-sizing: border-box;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #001529;
  transition: width 0.3s ease-in-out;
  user-select: none;

  &::-webkit-scrollbar {
    width: 0 !important;
  }

  &>* {
    flex: none;
  }

  .logo {
    position: sticky;
    top: 0;
    height: 56px;
    background: url("@/assets/admin.png") no-repeat center / 40px 40px;
    background-color: #002140;
    z-index: 1;
  }

  .fold {
    height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    background-color: #002140;
    margin-top: auto;

    &:hover {
      cursor: pointer;
    }
  }

}

.el-menu {
  border-right: none;


  // --el-menu-bg-color: #001628;
  --el-menu-bg-color: #001529;
  --el-menu-hover-bg-color: transparent;

  --el-menu-text-color: #bfcbd9;
  --el-menu-active-color: white;

  .el-menu-item {
    &.is-active {
      background: var(--el-color-primary);
      color: var(--el-menu-active-color);
    }

  }

  .el-menu-item:hover, .el-sub-menu__title:hover {
    color: var(--el-menu-active-color);
  }

  .el-sub-menu {
    &.is-active>.el-sub-menu__title {
      color: var(--el-menu-active-color);
    }

    .el-menu {
      --el-menu-bg-color: #0F2438;
    }
  }

  &.el-menu--collapse .is-active {
    background: var(--el-color-primary);
  }

}
</style>
