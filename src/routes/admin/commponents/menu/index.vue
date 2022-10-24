<script setup lang='ts'>
import { adminRoutes } from "@/routes";
import Nav from "./components/nav/index.vue";
const { setting } = $(mainStore());
</script>

<template tag="div" class="menu">
  <Nav :list="adminRoutes"></Nav>
</template>

<style lang='less'>
.menu {
  overflow-x: hidden;
  overflow-y: auto;
}

.left .menu, .mobile .menu {
  width: var(--aside-width, 200px);
  transition: width 0.2s;
}

</style>