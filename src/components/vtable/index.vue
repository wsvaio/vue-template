<script setup lang="ts">
import { usePagination } from "vue-request";
import { PaginationProps } from "element-plus";
import { TableProps } from "element-plus/es/components/table/src/table/defaults";
import { debounce } from "wsvaio";
const { action, submit: _submit,
  listKey = "items", currentKey = "page", pageSizeKey = "pageSize",
  totalKey = "count", totalPageKey = "max_page",
  formProps = {},
  drawer: _drawer = {},
} = defineProps<{
  action: (params: obj) => Promise<T>,
  submit: (ctx: vtableCtx) => Promise<boolean | void>,
  listKey?: string, currentKey?: string, pageSizeKey?: string,
  totalKey?: string, totalPageKey?: string,
  pagination?: Partial<PaginationProps>,
  drawer?: vdrawerCtx["drawer"],
  formProps?: vdrawerCtx["formProps"],
  table?: Partial<TableProps<any>>,
}>();
const checkList = reactive<obj[]>([]);
const params = reactive<obj>({});
watch(params, debounce(() => refresh(), 500));
const { refresh, data, loading, pageSize, total, current } = $(usePagination((data) => action({ ...data, ...params }), {
  pagination: { currentKey, pageSizeKey, totalPageKey, totalKey }
}));

const ctx = { checkList, params, refresh };
</script>

<template>
  <vdrawer :drawer="_drawer" :submit="drawerCtx => _submit({...ctx, ...drawerCtx})" class="vtable"
    :form-props="formProps" @submited="refresh">
    <template v-for="name of Object.keys($slots).filter(item => ![
      'default', 'top', 'bottom'
    ].includes(item))" #[name]="drawerCtx">
      <slot :name="name" :="{...ctx, ...drawerCtx}"></slot>
    </template>

    <template #="drawerCtx">
      <div v-if="$slots.top" class="vtable-top">
        <slot name="top" :="{...ctx, ...drawerCtx}"></slot>
      </div>

      <el-table v-loading="loading" :data="data && data[listKey] || []"
        :border="true" table-layout="auto" :="{ ...$attrs, ...$props.table }"
        @selection-change="list => { checkList.length = 0; checkList.push(...list); }">
        <slot :="{...ctx, ...drawerCtx}"></slot>
        <template #append>
          <slot name="bottom" :="{...ctx, ...drawerCtx}"></slot>
        </template>
      </el-table>

      <el-pagination v-model:currentPage="current" v-model:page-size="pageSize" m="t-25px"
        :total="total"
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
