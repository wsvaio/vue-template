<script setup lang="ts">
import { usePagination } from "vue-request";
import { PaginationProps, TableProps } from "element-plus";
import { debounce } from "@wsvaio/utils";
const {
  paging, action,
  form: form = {},
  drawer: drawer = {},

} = defineProps<{
  paging: (params: obj) => Promise<{ count: number, items: obj[] } & obj>,
  action: (ctx: vtableCtx) => Promise<any>,

  pagination?: Partial<PaginationProps>,
  drawer?: vtableCtx["drawer"],
  form?: vtableCtx["form"],
  table?: Partial<TableProps<obj>>,
}>();

const checkList = reactive<obj[]>([]);
const params = reactive<obj>({});
watch(params, debounce(() => refresh(), 500));
const { refresh, data, loading, pageSize, total, current } = $(usePagination((data) => paging({ ...data, ...params }), {}));

const vdrawerRef = $ref<vdrawerCtx>();
const ctx = reactive(<vtableCtx>{ checkList, params, refresh });
onMounted(() => vdrawerRef && Object.assign(ctx, vdrawerRef));
defineExpose(ctx);


</script>

<template>
  <vdrawer ref="vdrawerRef" :drawer="drawer" :action="() => action(ctx).then(data => data && refresh() || data)" class="vtable" :form="form"
    @submited="refresh">
    <template v-for="name of Object.keys($slots).filter(item => ![
      'default', 'top', 'bottom'
    ].includes(item))" #[name]>
      <slot :name="name" :="ctx"></slot>
    </template>

    <template #default>
      <div v-if="$slots.top" class="vtable-top">
        <slot name="top" :="ctx"></slot>
      </div>

      <el-table v-loading="loading" :data="data && data['items'] || []" :border="true"
        table-layout="auto" :="{ ...$attrs, ...$props.table }"
        @selection-change="list => { checkList.length = 0; checkList.push(...list); }">
        <slot :="ctx"></slot>
        <template #append>
          <slot name="bottom" :="ctx"></slot>
        </template>
      </el-table>

      <el-pagination v-model:currentPage="current" v-model:page-size="pageSize"
        :total="total" overflow="auto" m="t-25px"
        :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 1000]"
        layout="sizes, total, ->, prev, pager, next, jumper, slot" :="$props.pagination">
      </el-pagination>
    </template>
  </vdrawer>
</template>

<style lang="less">
.vtable {
  .vtable-top {
    display: flex;
    flex-wrap: wrap;
    margin: -3px -6px;

    & > * {
      margin: 3px 6px;

      &[m="l-auto"] {
        margin-left: auto;
      }
    }

    .el-button + .el-button {
      margin-left: 6px;
    }
  }

  .el-table {
    .el-link + .el-link {
      margin-left: 8px;
    }
  }

  .vtable-top ~ .el-table {
    margin-top: 15px;
  }
}
</style>
