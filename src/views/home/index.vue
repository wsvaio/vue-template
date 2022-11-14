<script setup name="home" lang='ts'>
</script>

<template tag="div">
  <vtable :paging="async params => ({
    page: 1,
    pageSize: 10,
    count: 20000,
    items: [
      { id: 1, name: 'ws' }
    ]
  })" :action="async ({ payload }) => {
    $utils.log(payload)
  }">
    <template #top="{ payload }">
      <el-button @click="payload.hh = 123">hh</el-button>
    </template>

    <el-table-column label="ID" prop="id"></el-table-column>
    <el-table-column label="NAME" prop="name"></el-table-column>
  </vtable>
</template>

<style lang="less" scoped>

</style>
