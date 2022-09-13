<script lang="ts" setup>
const { labelWidth } = defineProps<{ data: obj[], idKey?: string, labelWidth?: string }>();
const column = reactive<obj[]>([]);
const gridTemplateColumns = computed(() => column.map(item => item.width ?? labelWidth ?? "auto").join(" "));
defineExpose({ column });
</script>

<template tag="div" class="vtable">
  <div v-for="item in column" :="item.attrs">
    <component :is="item.slots.label" v-if="item.slots.label"></component>
    <template v-else>{{ item.label }}</template>
  </div>
  <template v-for="(item, index) in data">
    <div v-for="sub in column" :key="sub.label + item[idKey ?? 'id']" :="sub.attrs">
      <component :is="sub.slots.default" v-if="sub.slots.default" :row="item" :index="index"></component>
      <template v-else>{{ item[sub.prop] }}</template>
    </div>
  </template>
  <slot></slot>
</template>

<style lang="less" scoped>
.vtable {
  @apply grid max-w-100vw overflow-auto gap-1px text-center;
  grid-template-columns: v-bind(gridTemplateColumns);

  &>div {
    @apply flex flex-col justify-center items-center p-8px bg-white;

    &[sticky] {
      @apply sticky left-0 right-0 z-1;
      filter: invert(5%);
      
    }
    &:active {
      background-color: #F2F3F5;
    }
  }
}


::-webkit-scrollbar {
  height: 0;
  width: 0;
}
</style>
