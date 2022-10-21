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
  <el-menu class="menu" :default-active="active"
    :collapse="setting.layout == 'left' && setting.collapse"
    :mode="setting.layout == 'top' ? 'horizontal' : 'vertical'" :collapse-transition="false">
    <div flex="1"></div>
    <root-nav :list="adminRoutes"></root-nav>
  </el-menu>
</template>

<style lang="less">
.el-menu {

}
</style>
