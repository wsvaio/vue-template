<script setup name="home" lang='ts'>
import t from "./index copy 3.vue";
</script>

<template>
  <vpopup>
    <template #popup1>
      <t></t>
    </template>
    <template #="{ popup }">
      <div @mouseenter="popup.slot = 'popup1', popup.show = true" @mouseleave="popup.show = false">
        trigger2
        {{ popup.slot }}
      </div>
    </template>
  </vpopup>
</template>

<style lang="less" scoped>
div {
  background: red;
}
</style>