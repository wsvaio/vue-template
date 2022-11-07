<script setup lang='ts'>
import { Delete, DocumentAdd, Search } from "@element-plus/icons-vue";
import { merge, sleep } from "wsvaio";
const submit = async ({ checkList, drawer, form }: vtableCtx) => {
  const title = drawer.title;

  if (title == "删除") {
    if (checkList.length == 0) return ElNotification.warning("请选择删除项") && false;
    await Promise.all(checkList.map(({ id }) => delTodo({ param: { id } })));
    ElNotification.success("删除成功");
  }
  else if (title == "添加") {
    await postTodo({ body: form, success: "添加成功" });
  }
  else if (title == "打开详情") {
    drawer.title = "详情";
    drawer.slot = "add";
    const data = await getTodo({ param: form });
    merge(form, data);
    return false;
  }
  else if (title == "详情") {
    await putTodo({ body: form, success: "修改成功" });
  }

  return true;

};

</script>

<template>
  <vtable :action="query => $apis.getTodo({ query })" :submit="submit">
    <template #top="{ params, submit: sbt, drawer }: vtableCtx">
      <el-form :disabled="false">
        <el-input v-model="params.key" :prefix-icon="Search" placeholder="搜索"></el-input>
      </el-form>

      <el-button type="primary" :icon="DocumentAdd" m="l-auto"
        @click="drawer.title = '添加', drawer.slot = 'add'">
        添加
      </el-button>
      <el-popconfirm #reference title="您确定要删除吗？" @confirm="sbt('删除')">
        <el-button :icon="Delete" type="danger">删除</el-button>
      </el-popconfirm>
    </template>
    <template #="{ drawer, form, submit }: vtableCtx">
      <el-table-column type="selection" :align="'center'"></el-table-column>
      <el-table-column label="标题" prop="title" sortable></el-table-column>
      <el-table-column label="是否完成" prop="checked" sortable></el-table-column>
      <el-table-column label="修改日期" prop="updatedAt" sortable></el-table-column>
      <el-table-column label="创建日期" prop="createdAt" sortable></el-table-column>
      <el-table-column label="操作" #="{ row }">
        <el-link type="primary" @click="merge(form, row), submit('打开详情')">详情</el-link>
      </el-table-column>
    </template>


    <template #add="{ form, drawer }: vtableCtx">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input v-model="form.content" rows="10" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="是否完成" prop="checked">
        <el-switch v-model="form.checked"></el-switch>
      </el-form-item>
    </template>
  </vtable>
</template>

<style lang='less' scoped>

</style>