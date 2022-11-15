<script lang="ts" name="item2" setup>
  import { sleep } from "@wsvaio/utils";


  const submit = async (h: vdrawerCtx) => {
    console.log(h);
    await sleep(1000);

    return false;
  };

  const action = async (params) => {
    console.log(params);
    await sleep(1000);
    return {
      count: 10,
      items: [
      { id: 1, name: "hh", age: 123 },
      { id: 2, name: "h234h", age: 123 },
      { id: 3, name: "hh", age: 123 },
      { id: 4, name: "h342h", age: 123 },
      { id: 5, name: "h23h", age: 123 },

    ]
    };
  };
  </script>

<template tag="div">
  <vtable :action="action" :submit="submit">
    <template #="ctx: vtableCtx">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="NAME" prop="name"></el-table-column>
      <el-table-column label="setting">
        <el-link @click="ctx.drawer.slot = 'hh'">d</el-link>
      </el-table-column>
    </template>
  </vtable>
</template>

  <style lang="less" scoped>

  </style>
