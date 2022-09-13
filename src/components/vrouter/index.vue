<script lang="ts" name="vrouter" setup>
  const { nameList } = $(mainStore());

  const { keepAlive=false, routerKey=false } = defineProps<{
    keepAlive?: boolean;
    routerKey?: boolean;
    name?: string;
  }>();

  </script>

<template>
  <router-view #="{ Component }">
    <keep-alive v-if="keepAlive" :include="[...nameList]">
      <component :is="Component" :key="routerKey ? `${name}${$route.fullPath}` : undefined"></component>
    </keep-alive>
    <component :is="Component" v-else :key="routerKey ? `${name}${$route.fullPath}` : undefined"></component>
  </router-view>
</template>
