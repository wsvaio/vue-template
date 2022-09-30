<script setup lang='ts'>
import { Delete, DocumentAdd, Search } from "@element-plus/icons-vue";
const submit = async ({ checkList, drawer }: vtableCtx) => {
  const title = drawer.title;
  if (title == "删除") {
    const _ids = checkList.map(item => item._id);
    await delTodo({ query: { _ids } });
  }

  return true;

};

</script>

<template>
  <vtable :action="query => $apis.moreTodo({ query })" :submit="submit">
    <template #top="{ params, submit: sbt, }: vtableCtx">
      <el-form :disabled="false">
        <el-input v-model="params.key" :prefix-icon="Search" placeholder="搜索"></el-input>
      </el-form>

      <el-button type="primary" :icon="DocumentAdd" m="l-auto">添加</el-button>
      <el-button type="danger" :icon="Delete" @click="sbt('删除')">删除</el-button>
    </template>
    <template #="{  }: vtableCtx">
      <el-table-column type="selection" :align="'center'"></el-table-column>
      <el-table-column label="名称" prop="name" sortable></el-table-column>
      <el-table-column label="内容" prop="content" sortable></el-table-column>
      <el-table-column label="是否完成" prop="complete" sortable></el-table-column>
      <el-table-column label="修改日期" prop="updatedAt" sortable></el-table-column>
      <el-table-column label="创建日期" prop="createdAt" sortable></el-table-column>
    </template>
  </vtable>
</template>

<style lang='less' scoped>

</style>