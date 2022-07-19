<script lang="ts" setup>



let text = $ref("123");


function handler(event) {

  text = event;
}



EventBus.on("click", event => {
  console.log(event);
});



</script>

<template tag="div">
  <div class="m-l-1px mr-1px" m="l-1px" un:items="center"></div>
  <n-h1 class="">测试全局事件总线</n-h1>
  <n-text block>{{ text }}</n-text>
  <el-button @click="$bus.emit('click', new Date())">按钮</el-button>
  <el-button block @click="$bus.off('click', handler)">移除绑定</el-button>
  <el-button block @click="$bus.on('click', handler)">添加绑定</el-button>
  <el-button @click="">123</el-button>
</template>

<style lang="less" scoped>
.el-button+.el-button {
  margin-left: 0px;
  @apply ml-1px;
}
</style>

