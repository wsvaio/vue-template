<script setup lang='ts'>
import { adminRoutes } from "@/routes";
import vnav from "./components/vnav/index.vue";
import useStore from "@/routes/admin/store";
import { RouteRecordRaw } from "vue-router";
import IEllipsis from "~icons/uit/ellipsis-h";
let { layout, collapse } = $(useStore());
const menuRef = $ref<HTMLDivElement>();
let count = $ref(0);
const list = computed(() => {
  if (layout != "top") return adminRoutes;
  const l = [...adminRoutes];
  if (l.length > count) {
    l.length = count;
    l.push({
      path: "",
      name: "",
      meta: { title: "", icon: IEllipsis },
      children: adminRoutes.slice(count)
    });
  }
  console.log(l);
  return l;
});


const handlerResize = () => {
  if (window.innerWidth < 768) layout = "mobile";
  else layout == "mobile" && (layout = "left");

  if (!menuRef || layout != "top") return;
  count = Math.floor(menuRef.clientWidth / 100);
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
  <vnav :routes="list"></vnav>
</template>

<style lang='less'>
.menu {
  overflow-x: hidden;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }
}
</style>

<style lang='less'>
.admin-layout.top .menu {
  display: flex;
  justify-content: flex-end;
  overflow-x: auto;
}
</style>
