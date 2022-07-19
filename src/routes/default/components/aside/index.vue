<script lang="ts" setup>
import adminStore from '@/stores/adminStore';

import { layoutMap } from '@/routes';

const route = useRoute();
const state = reactive({ isCollapse: false });

const { exclude, include } = $(adminStore());

function changeCollapse() {
  state.isCollapse = !state.isCollapse;
}
function concatPath(p_path: string, c_path: string = '') {
  return `${p_path !== '' ? '/' + p_path : '/'}${c_path !== '' ? '/' + c_path : ''}`;
}

function isShow(route) {
  return (include.length == 0 || include.includes(route.name)) && !exclude.includes(route.name);
}

</script>

<template>
  <el-aside :width="state.isCollapse ? `64px` : `200px`">

    <div class="logo"></div>

    <el-menu
    background-color="#001529"
    text-color="#eee"
    active-text-color="#fff"
    router
    :default-active="route.path"
    :collapse="state.isCollapse">

      <template v-for="item in layoutMap" :key="item.name">
        <el-sub-menu v-if="item.children && item.children.length && isShow(item)" :index="concatPath(item.path)">
          <template #title>
            <el-icon :size="20" v-if="item.meta?.icon">
              <component :is="`i-${item.meta?.icon}`" />
            </el-icon>
            <span>{{ item.meta?.title ?? item.path }}</span>
          </template>
          <template v-for="sub in item.children" :key="item.name">
            <el-menu-item :index="concatPath(item.path, sub.path)" v-if="isShow(sub)">
              <el-icon :size="20" v-if="sub.meta?.icon">
                <component :is="`i-${sub.meta?.icon}`" />
              </el-icon>
              <template #title>{{ sub.meta?.title || sub.name || sub.path }}</template>
            </el-menu-item>
          </template>
        </el-sub-menu>
        <el-menu-item v-else-if="isShow(item)" :index="concatPath(item.path)">
          <el-icon :size="20" v-if="item.meta?.icon">
            <component :is="`i-${item.meta?.icon}`" />
          </el-icon>
          <template #title>{{ item.meta?.title || item.name || item.path }}</template>
        </el-menu-item>
      </template>
    </el-menu>
    <div class="fold" @click="changeCollapse">
      <el-icon v-show="!state.isCollapse">
        <i-arrow-left-bold />
      </el-icon>
      <el-icon v-show="state.isCollapse">
        <i-arrow-right-bold />
      </el-icon>
    </div>
  </el-aside>
</template>

<style lang="less" scoped>
.noScrollBar {
  overflow: hidden;
  overflow-y: scroll;
  overflow: -moz-scrollbars-none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    width: 0 !important;
  }
}

.noSelect {
  user-select: none;
}

.el-aside {
  box-sizing: border-box;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #001529;
  overflow: hidden;
  transition: width 0.3s ease-in-out;
  .noSelect;

  .logo {
    height: 56px;
    background: url("@/assets/admin.png") no-repeat center / 40px 40px, #002140;
  }

  .el-menu {
    flex: 1;
    border-right: none;
    .noScrollBar;

    &:not(.el-menu--collapse) {
      width: 200px;
    }
  }

  .fold {
    height: 48px;
    line-height: 48px;
    color: #fff;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    background-color: #002140;

    &:hover {
      cursor: pointer;
    }
  }
}

/* 激活选中菜单 */
.el-menu-item.is-active,
.el-menu--popup .el-menu-item.is-active {
  background-color: #1890ff !important;
}
</style>
<style  lang="less">
.el-aside {
  .el-menu--collapse {

    // 收起样式
    .el-sub-menu__title {
      .el-sub-menu__icon-arrow {
        display: none;
      }

      span {
        display: none;
      }
    }
  }
}
</style>