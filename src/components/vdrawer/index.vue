<script setup lang="ts">
import { useRequest } from "vue-request";
import { FormInstance } from "element-plus";
import { merge, omit } from "wsvaio";
const {
  submit: _submit = async () => { },
  formProps: _formProps = {},
  drawer: _drawer = {},
} = defineProps<{
  submit?: (ctx: vdrawerCtx) => Promise<boolean | void>,
  drawer?: vdrawerCtx["drawer"],
  formProps?: vdrawerCtx["formProps"],
}>();
const emit = defineEmits<{
  (e: "submited", data: boolean): void
}>();
const delFormRef = $ref<FormInstance>();
const formProps = reactive<vdrawerCtx["formProps"]>({});
const form = reactive<vdrawerCtx["form"]>({});
const drawer = reactive<vdrawerCtx["drawer"]>({ show: false, slot: "" });
const { run: submit, loading } = $(useRequest(async (title = "") => {
  await delFormRef?.validate();
  title && (drawer.title = title);
  return await _submit(ctx).finally(() => !drawer.slot && (drawer.title = ""));
}, {
  manual: true,
  onSuccess(data) {
    if (!data) return;
    drawer.show = false;
    emit("submited", !!data);
  }
}));
watchEffect(() => drawer.show = !!drawer.slot);

const close = () => {
  merge(form, {}, { del: true });
  merge(drawer, { show: false, slot: "" }, { del: true });
  merge(formProps, {}, { del: true });
  delFormRef?.clearValidate();
};

const ctx = { drawer, form, formProps, submit, loading: $$(loading) };
defineExpose(ctx);
</script>

<template>
  <el-form ref="elFormRef" :model="form" :="{ ..._formProps, ...formProps }" :disabled="loading">
    <el-drawer v-model="drawer.show" :="omit({ ..._drawer, ...drawer }, 'slot', 'show')"
      :before-close="done => loading || done()" @closed="close">
      <div v-loading="loading" min="h-full">
        <slot :name="drawer.slot" :="ctx"></slot>
      </div>
      <template #footer>
        <slot :name="`${drawer.slot}-footer`" :="ctx">
          <el-button @click="drawer.show = false">取消</el-button>
          <el-button type="primary" @click="submit()">
            <slot :name="`${drawer.slot}-submit-text`" :="ctx">确定</slot>
          </el-button>
        </slot>
      </template>
    </el-drawer>
    <slot :="ctx"></slot>
  </el-form>
</template>

