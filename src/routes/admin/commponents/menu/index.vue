<script setup lang='ts'>
import { adminRoutes } from "@/routes";
import Nav from "./components/nav/index.vue";
import IEllipsis from "~icons/uit/ellipsis-h";
import mainLayoutStore from "@/routes/admin/stores/adminLayoutStore";
let { layout} = $(mainLayoutStore());
const menuRef = $ref<HTMLDivElement>();

let num = $ref(0);

const list = computed(() => {
  if (layout != "top") return adminRoutes;
  const l = [...adminRoutes];
  l.length = num;
  l.push({
    path: "",
    name: "",
    meta: { title: "", icon: IEllipsis },
    children: adminRoutes.slice(num)
  });
  return l;
});

const handlerResize = () => {
  if (window.innerWidth < 768) layout = "mobile";
  else layout == "mobile" && (layout = "left");

  if (!menuRef) return;
  num = Math.floor(menuRef.clientWidth / 100);
};

watchEffect(() => {
  if (layout == "top") handlerResize();
});

onMounted(() => {
  handlerResize();
  window.addEventListener("resize", handlerResize);
});
onUnmounted(() => {
  window.removeEventListener("resize", handlerResize);
});

</script>

<template ref="menuRef" tag="div" class="menu">
  <Nav :list="list" :deep="1"></Nav>
</template>

<style lang='less'>
.menu {
  overflow-x: hidden;
  overflow-y: auto;
  background: var(--menu-bg-color, #001529);

  &::-webkit-scrollbar {
    display: none;
  }
}

.left .menu, .mobile .menu {
  width: var(--aside-width, 200px);
  transition: width 0.2s;
}

.top {
  .menu {
    display: flex;
    justify-content: flex-end;
    overflow-x: auto;
    border-bottom: 1px solid var(--el-border-color);
  }
}
</style>
