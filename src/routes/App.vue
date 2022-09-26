<script setup lang='ts'>
import zhCn from "element-plus/dist/locale/zh-cn.mjs";
import { zhCN as NZhCn, dateZhCN } from "naive-ui";
</script>

<template>
  <el-config-provider :locale="zhCn">
    <n-config-provider :locale="NZhCn" :date-locale="dateZhCN">
      <router-view></router-view>
    </n-config-provider>
  </el-config-provider>
</template>

<style lang='less' scoped>

</style>