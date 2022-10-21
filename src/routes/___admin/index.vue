<script setup lang='ts'>
import Logo from "./commponents/logo/index.vue";
import BreadCrumb from "./commponents/bread-crumb/index.vue";
import Setting from "./commponents/setting/index.vue";
import Menu from "./commponents/menu/index.vue";
import Tab from "./commponents/tab/index.vue";
import Main from "./commponents/main/index.vue";
import Fold from "./commponents/fold/index.vue";

const { setting, asideWidth } = $(mainStore());


</script>

<template tag="div" :class="['admin', setting.layout, setting.collapse && 'collapse']" :style="{ '--aside-width': asideWidth }">
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
  width: 100%;
  height: 100vh;
  grid-template-columns: max-content max-content max-content 1fr max-content;
  grid-template-rows: 48px max-content 1fr;

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

    .bread-crumb {
      grid-column: span 2;
    }

    .menu {
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
      grid-row: span 2;
    }

    .tab, .main {
      grid-column: span 4;
    }
  }
}
</style>