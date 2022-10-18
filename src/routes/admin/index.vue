<script lang="ts" setup>
import Aside from "./components/aside/index.vue";
import Header from "./components/header/index.vue";
import Main from "./components/main/index.vue";
import Tab from "./components/tab/index.vue";
import copyright from "./components/copyright/index.vue";


</script>

<template>
  <el-container class="layout">
    <Aside></Aside>
    <el-container>
      <Header></Header>
      <Tab></Tab>
      <Main></Main>
      <el-footer height="auto">
        <copyright></copyright>
      </el-footer>
    </el-container>
  </el-container>
</template>

<style lang="less" scoped>
.layout {
  overflow: hidden;
  box-sizing: border-box;
  width: 100vw;
  height: 100vh;
  background: #f3f6f8;

  .el-container {
    display: flex;
    overflow: auto;
    position: relative;
    height: 100vh;
    background: linear-gradient(white 0%, white 100%) top / 100% 90px no-repeat;
    flex-flow: column nowrap;

    .el-main {
      overflow: visible;
      padding: 16px;
    }

    .el-footer {
      padding: 12px;
      text-align: center;
    }
  }
}
</style>