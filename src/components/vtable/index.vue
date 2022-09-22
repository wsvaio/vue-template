<script lang="ts" setup>
const { labelWidth } = defineProps<{ data: obj[], idKey?: string, labelWidth?: string }>();
const column = reactive<obj[]>([]);
const gridTemplateColumns = computed(() => column.map(item => item.width ?? labelWidth ?? "auto").join(" "));
defineExpose({ column });
</script>

<template tag="div" class="vtable">
  <div v-for="col, x in column" :="col.attrs"
    :class="[`row-0`, `col-${x}`, `row-even`, x % 2 == 0 ? `col-even` : `col-odd`]">
    <component :is="col.slots.label" v-if="col.slots.label" :="{col, x, y: 0}"></component>
    <template v-else>{{ col.label }}</template>
  </div>
  <template v-for="row, y in data">
    <div v-for="col, x in column" :key="col.label + row[idKey ?? 'id']" :="col.attrs"
      :class="[`row-${y+1}`, `col-${x}`, (y+1) % 2 == 0 ? `row-even` : `row-odd`, x % 2 == 0 ? `col-even` : `col-odd`]">
      <component :is="col.slots.default" v-if="col.slots.default" :="{row, col, x, y: y+1}">
      </component>
      <template v-else>{{ row[col.prop] }}</template>
    </div>
  </template>
  <slot></slot>
</template>

<style lang="less">
.vtable {
  @apply grid max-w-100vw overflow-auto gap-1px text-center;
  grid-template-columns: v-bind(gridTemplateColumns);

  &>div {
    @apply flex flex-col justify-center items-center p-8px bg-white;

    &[sticky] {
      @apply sticky left-0 right-0 z-1;
      filter: invert(10%);
    }

    &:active {
      filter: invert(5%);
    }
  }

  &::-webkit-scrollbar {
    height: 0;
    width: 0;
  }
}
</style>
