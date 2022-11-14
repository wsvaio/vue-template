<script setup lang='ts'>
import Logo from "./commponents/logo/index.vue";
import BreadCrumb from "./commponents/bread-crumb/index.vue";
import Setting from "./commponents/setting/index.vue";
import Menu from "./commponents/menu/index.vue";
import Tab from "./commponents/tab/index.vue";
import Main from "./commponents/main/index.vue";
import Fold from "./commponents/fold/index.vue";
import mainLayoutStore from "@/routes/admin/stores/adminLayoutStore";
let { layout, collapse, asideWidth } = $(mainLayoutStore());

watchEffect(() => {
  if (layout == "left") {
    document.documentElement.classList.add("left");
    document.documentElement.classList.remove("mobile");
    document.documentElement.classList.remove("top");
  } else if (layout == "top") {
    document.documentElement.classList.add("top");
    document.documentElement.classList.remove("mobile");
    document.documentElement.classList.remove("left");
    collapse = false;
  } else if (layout == "mobile") {
    document.documentElement.classList.add("mobile");
    document.documentElement.classList.remove("top");
    document.documentElement.classList.remove("left");
  }
});



</script>

<template tag="div" :class="['admin', layout, collapse && 'collapse']" :style="{ '--aside-width': asideWidth }">
  <Logo></Logo>
  <Fold></Fold>
  <BreadCrumb></BreadCrumb>
  <Setting></Setting>
  <Menu></Menu>
  <Tab></Tab>
  <Main></Main>
</template>

<style lang='less' scoped>
.admin {
  display: grid;
  overflow: auto;
  width: 100%;
  height: 100vh;
  grid-template-columns: auto auto 1fr auto max-content;
  grid-template-rows: 48px auto 1fr;

  & > *:nth-child(1) {
    order: 1;
  }

  & > *:nth-child(2) {
    order: 2;
  }

  & > *:nth-child(3) {
    order: 3;
  }

  & > *:nth-child(4) {
    order: 4;
  }

  & > *:nth-child(5) {
    order: 5;
  }

  & > *:nth-child(6) {
    order: 6;
  }

  & > *:nth-child(7) {
    order: 7;
  }

  &.left {
    .bread-crumb {
      grid-column: span 2;
    }

    .menu {
      grid-row: span 2;
    }

    .tab, .main {
      grid-column: span 4;
    }
  }

  &.top {
    .icon {
      display: none;
    }

    .menu {
      grid-column: span 2;
      order: 3;
    }

    .tab, .main {
      grid-column: span 5;
    }
  }

  &.mobile {
    .bread-crumb {
      grid-column: span 2;
    }

    .menu {
      grid-row: span 4;
    }

    .tab, .main {
      grid-column: span 4;
    }
  }
}
</style>
