<script lang="ts" setup>
import { RouteRecordRaw } from "vue-router";
import Nav from "./index.vue";
import Popup from "../popup/index.vue";
import { ArrowDown } from "@element-plus/icons-vue";
import adminLayoutStore from "@/routes/admin/stores/adminLayoutStore";

const { deep = 1 } = defineProps<{ list: RouteRecordRaw[]; deep?: number }>();

const { exclude, include } = $(adminStore());


function isShow(route) {
  return (include.length == 0 || include.includes(route.name)) && !exclude.includes(route.name) && route.meta?.icon && (!route.children || route.children.length > 0);
}

function isMenuItem(route) {
  return !route.children || route.children.filter(item => item.meta?.icon).length == 0;
}


const options = reactive({ close: false });
provide("options", options);
const optionsInject = inject<typeof options | null>("options", null);
watchEffect(() => {
  if (!optionsInject) return;
  options.close = optionsInject.close;
});
const { layout, collapse } = $(adminLayoutStore());

const route = useRoute();
const isRouteActive = (routes: RouteRecordRaw[]) => {
  for (const item of routes) {
    if (item.name == route.name) return true;
    else if (isRouteActive(item.children ?? [])) return true;
  }
  return false;
};
</script>

<template>
  <slot :options="options"></slot>
  <template v-for="item in list.filter(item => isShow(item))" :key="item.name">
    <div v-if="isMenuItem(item)" :class="[
      'menu-nav-item',
      (options.close || optionsInject?.close || collapse) && deep != 1 && 'close',
      $route.name == item.name && 'active',
      deep != 1 && 'sub',
    ]" :title="item.meta.title" :style="{ '--deep': deep }"
      @click="$router.push({ name: item.name, params: $route.params })">
      <component :is="item.meta.icon" class="icon"></component>
      <div class="text">{{ item.meta.title }}</div>
    </div>
    <Nav v-else :list="item.children!" :deep="deep + 1" #="{ options: opts }">
      <Popup :title="item.meta.title" :style="{ '--deep': deep }"
        :direction="(!optionsInject && layout == 'top') ? 'bottom' : 'right'"
        :class="[
          'menu-nav-item', 'title',
          isRouteActive(item.children) && 'active',
          (options.close || optionsInject?.close || collapse) && deep != 1 && 'close',
          deep != 1 && 'sub'
        ]"
        @click="opts.close = !opts.close">
        <template v-if="collapse || layout == 'top'" #popup>
          <Nav :list="item.children!"></Nav>
        </template>
        <component :is="item.meta.icon" class="icon"></component>
        <div v-if="item.meta.title" class="text">{{ item.meta.title }}</div>
        <ArrowDown v-show="optionsInject || (!collapse && layout != 'top')"
          :class="['arrow', opts.close && 'close', collapse && 'collapse']">
        </ArrowDown>
      </Popup>
    </Nav>
  </template>
</template>
<style lang="less">
.menu-nav-item {
  display: flex;
  overflow: hidden;
  padding-right: 12px;
  padding-left: calc(var(--deep) * 12px);
  width: var(--aside-width, 200px);
  height: 50px;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: var(--menu-text-color, rgba(255, 255, 255, 70%));
  background: var(--menu-bg-color, #001529);
  transition: height 0.2s, color 0.2s, width 0.2s, background 0.2s, border 0.2s, opacity 0.2s;
  align-items: center;

  &:hover {
    color: var(--menu-text-active-color, white);
    cursor: pointer;
  }

  &.sub {
    background: var(--menu-bg-sub-color, #0c2135);
  }

  &:not(.title).active {
    color: var(--menu-text-active-color, white);
    background: var(--menu-bg-active-color, var(--el-color-primary));
  }

  & > .icon {
    width: 18px;
    height: 18px;
  }

  & > .text {
    margin-left: 6px;
  }

  & > .arrow {
    margin-left: auto;
    width: 14px;
    height: 14px;
    transition: transform 0.2s;

    &.close {
      transform: rotate(180deg);
    }

    &.collapse {
      transform: rotate(-90deg);
    }
  }

  &.title {
    &.active {
      color: var(--menu-text-active-color, white);
    }
  }

  &.close {
    height: 0;
    opacity: 0;
  }
}
</style>

<style lang="less">
.left {
  .menu-nav-item {}
}

.left .collapse {
  .menu-nav-item {
    justify-content: center;
    border: 3px solid transparent;
    border-top: 0;
    border-bottom: 0;

    & > .text {
      display: none;
    }

    &.sub {
      display: none;
    }

    &.active {
      border-left-color: var(--el-color-primary);
      background: var(--menu-bg-collaspe-color, #00061a);
    }
  }
}
</style>



<style lang="less">
.top {
  .menu-nav-item {
    width: auto;

    &.active {
      color: var(--el-color-primary, black);
      background: var(--menu-bg-color, #001529);
    }

    &.sub {
      display: none;
    }

    & > .arrow {
      transform: rotate(-90deg);
    }
  }
}

.top .menu {
  .menu-nav-item {
    border: 2px solid transparent;
    border-right: 0;
    border-left: 0;
    height: auto;

    &.active, &:hover {
      border-bottom-color: var(--el-color-primary);
    }
  }
}
</style>

<style lang="less">
.mobile {
  .menu-nav-item, {}
}
</style>