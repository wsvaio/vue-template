<script lang="ts" name="vrouter" setup>
  const { nameList } = $(mainStore());

  const { keep=false, name="" } = defineProps<{
    keep?: boolean;
    name?: string;
  }>();

  </script>

<template>
  <router-view #="{ Component }">
    <keep-alive v-if="keep" :include="[...nameList]">
      <component :is="Component" :key="name ? `${name}:${$route.fullPath}` : undefined"></component>
    </keep-alive>
    <component :is="Component" v-else :key="name ? `${name}:${$route.fullPath}` : undefined"></component>
  </router-view>
</template>
