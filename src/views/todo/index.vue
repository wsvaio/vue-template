<script setup lang='ts'>
import { Delete, DocumentAdd, Search, Refresh } from "@element-plus/icons-vue";
import { merge, sleep } from "wsvaio";
const submit = async ({ checkList, drawer, payload }: vtableCtx) => {
  const name = payload.name;
  if (name == "删除") {
    if (checkList.length == 0) return ElNotification.warning("请选择删除项") && false;
    await Promise.all(checkList.map(({ id }) => delTodo({ param: { id } })));
    ElNotification.success("删除成功");
  }
  else if (name == "添加") {
    await postTodo({ body: payload, success: "添加成功" });
  }
  else if (name == "打开详情") {
    drawer.title = "详情";
    drawer.slot = "add";
    const data = await getTodo({ param: payload });
    merge(payload, { name: "详情", ...data });
    return false;
  }
  else if (name == "详情") {
    await putTodo({ body: payload, success: "修改成功" });
  }

  return true;

};

</script>

<template>
  <vtable :paging="query => $apis.getTodo({ query })" :action="submit">
    <template #top="{ params, action, drawer }: vtableCtx">
      <el-form :disabled="false">
        <el-input v-model="params.key" :prefix-icon="Search" placeholder="搜索"></el-input>
      </el-form>

      <el-button type="info" :icon="Refresh" m="l-auto" @click="action()">刷新</el-button>
      <el-button type="primary" :icon="DocumentAdd"
        @click="drawer.title = '添加', drawer.slot = 'add'">
        添加
      </el-button>
      <el-popconfirm #reference title="您确定要删除吗？" @confirm="action('删除')">
        <el-button :icon="Delete" type="danger">删除</el-button>
      </el-popconfirm>
    </template>
    <template #="{ drawer, form, payload, action }: vtableCtx">
      <el-table-column type="selection" :align="'center'"></el-table-column>
      <el-table-column label="标题" prop="title" sortable></el-table-column>
      <el-table-column label="是否完成" prop="checked" sortable></el-table-column>
      <el-table-column label="修改日期" prop="updatedAt" sortable></el-table-column>
      <el-table-column label="创建日期" prop="createdAt" sortable></el-table-column>
      <el-table-column label="操作" #="{ row }">
        <el-link type="primary" @click="merge(payload, row), action('打开详情')">详情</el-link>
      </el-table-column>
    </template>


    <template #add="{ payload, drawer }: vtableCtx">
      <el-form-item label="标题" prop="title">
        <el-input v-model="payload.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="payload.content" rows="10" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="是否完成" prop="checked">
        <el-switch v-model="payload.checked"></el-switch>
      </el-form-item>
    </template>
  </vtable>
</template>

<style lang='less' scoped>

</style>
