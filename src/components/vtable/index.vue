<script setup lang="ts">
import { usePagination } from "vue-request";
import { PaginationProps, DrawerProps, FormProps, DialogProps } from "element-plus";
import { TableProps } from "element-plus/es/components/table/src/table/defaults";
import { debounce } from "wsvaio";
const { action, submit: _submit = async () => { },
  listKey = "items", currentKey = "page", pageSizeKey = "pageSize",
  totalKey = "count", totalPageKey = "max_page",
  form: _form = {},
  drawer: _drawer = {},
  dialog: _dialog = {}
} = defineProps<{
  action: (params: obj) => Promise<T>,
  submit?: (ctx: vtableCtx) => Promise<T>,
  listKey?: string, currentKey?: string, pageSizeKey?: string,
  totalKey?: string, totalPageKey?: string,
  pagination?: Partial<PaginationProps>,
  drawer?: Partial<DrawerProps>,
  dialog?: Partial<DialogProps>,
  form?: Partial<FormProps>,
  table?: Partial<TableProps<any>>,
}>();
const checkList = reactive<obj[]>([]);
const params = reactive<obj>({});
watch(params, debounce(() => refresh(), 500));
const { refresh, data, loading, pageSize, total, current } = $(usePagination((data) => action({ ...data, ...params }), {
  pagination: { currentKey, pageSizeKey, totalPageKey, totalKey }
}));
</script>

<template>
  <veject :form="_form" :drawer="_drawer" :dialog="_dialog" :submit="_submit" @submited="data && refresh()">
    <template #="ctx">
      <div flex="~ wrap gap-x-12px gap-y-6px" items="center" class="top">
        <slot name="top" :="{...ctx, params, checkList}" :loading="loading"></slot>
      </div>

      <el-table v-loading="loading" m="t-15px" :data="data && data[listKey] || []" :="{ ...$attrs, ...$props.table }" @selection-change="list => { checkList.length = 0; checkList.push(...list); }">
        <slot :="{...ctx, params, checkList}"></slot>
        <template #append>
          <slot name="bottom" :="{...ctx, params, checkList}" :loading="loading"></slot>
        </template>
      </el-table>

      <el-pagination v-model:currentPage="current" v-model:page-size="pageSize" m="t-25px" :total="total" :page-sizes="[10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 200, 300, 400, 500, 1000]"
        layout="total, sizes, prev, pager, next, jumper, ->, slot" :="$props.pagination"></el-pagination>
    </template>

    <template v-for="name of Object.keys($slots).filter(item => ![
      'default', 'top', 'bottom'
    ].includes(item))" #[name]="ctx">
      <slot :name="name" :="{...ctx, params, checkList}" :loading="loading"></slot>
    </template>
  </veject>
</template>

<style lang="less" scoped>
.top {
  :deep(.el-button+.el-button) {
    margin-left: 0px;
  }
}

:deep(.el-link+.el-link) {
  margin-left: 12px;
}
</style>