<script lang="ts" setup>
import adminStore from "@/stores/adminStore";
import { RouteRecordRaw } from "vue-router";
import Nav from "./index.vue";
const { deep = 1 } = defineProps<{ list: RouteRecordRaw[]; deep?: number }>();

const { exclude, include } = $(adminStore());


function isShow(route) {
  return (include.length == 0 || include.includes(route.name)) && !exclude.includes(route.name) && route.meta?.icon;
}

function isMenuItem(route) {
  return !route.children || route.children.filter(item => item.meta?.icon).length == 0;
}


const options = reactive({ close: false });
provide("options", options);
const optionsInject = inject<typeof options | null>("options", null);

</script>

<template>
  <slot :options="options"></slot>
  <template v-for="item in list.filter(item => isShow(item))" :key="item.name">
    <div v-if="isMenuItem(item)"
      :class="['item', (options.close || optionsInject?.close) && 'close']"
      :title="String(item.name)" @click="$router.push({ name: item.name })">
      {{ item.name }}
    </div>
    <Nav v-else :list="item.children!" :deep="deep + 1" #="{ options }">
      <div class="title" :title="String(item.name)" @click="options.close = !options.close">
        {{
          item.name
        }}
      </div>
    </Nav>
  </template>
</template>

<style lang="less" scoped>
.item, .title {
  --deep: v-bind(deep);

  overflow: hidden;
  height: 50px;
  line-height: 50px;
  white-space: nowrap;
  text-overflow: ellipsis;
  transition: height 0.2s;
}

.title {
  padding-left: calc((var(--deep) - 1) * 12px);
}

.item {
  padding-left: calc(var(--deep) * 12px);

  &.close {
    height: 0;

    & + .title {
      height: 0;
    }
  }
}
</style>