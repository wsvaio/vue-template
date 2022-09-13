<script setup lang="ts">
  import { useRequest } from "vue-request";
  import { FormInstance } from "element-plus";
  import { merge, omit } from "wsvaio";
  const {
    submit: _submit = async () => { },
    formProps: _formProps = {},
    dialog: _dialog = {},
  } = defineProps<{
    submit?: (ctx: vdialogCtx) => Promise<boolean | void>,
    dialog?: vdialogCtx["dialog"],
    formProps?: vdialogCtx["formProps"],
  }>();
  const emit = defineEmits<{
    (e: "submited", data: boolean): void
  }>();
  const elFormRef = $ref<FormInstance>();
  const formProps = reactive<vdialogCtx["formProps"]>({});
  const form = reactive<vdialogCtx["form"]>({});
  const dialog = reactive<vdialogCtx["dialog"]>({ show: false, slot: "" });
  const { run: submit, loading } = $(useRequest(async (title = "") => {
    await elFormRef?.validate();
    title && (dialog.title = title);
    return await _submit(ctx).finally(() => !dialog.slot && (dialog.title = ""));
  }, {
    manual: true,
    onSuccess(data) {
      if (!data) return;
      dialog.show = false;
      emit("submited", !!data);
    }
  }));
  watchEffect(() => dialog.show = !!dialog.slot);

  const close = () => {
    merge(form, {}, { del: true });
    merge(dialog, { show: false, slot: "" }, { del: true });
    merge(formProps, {}, { del: true });
    elFormRef?.clearValidate();
  };

  const ctx = { dialog, form, formProps, submit, loading: $$(loading) };
  defineExpose(ctx);
  </script>

<template>
  <el-form ref="elFormRef" :model="form" :="{ ..._formProps, ...formProps }" :disabled="loading">
    <el-dialog v-model="dialog.show" :="omit({ ..._dialog, ...dialog }, 'slot', 'show')"
      :before-close="done => loading || done()" @closed="close">
      <div v-loading="loading" min="h-full">
        <slot :name="dialog.slot" :="ctx"></slot>
      </div>
      <template #footer>
        <slot :name="`${dialog.slot}-footer`" :="ctx">
          <el-button @click="dialog.show = false">取消</el-button>
          <el-button type="primary" @click="submit()">
            <slot :name="`${dialog.slot}-submit-text`" :="ctx">确定</slot>
          </el-button>
        </slot>
      </template>
    </el-dialog>
    <slot :="ctx"></slot>
  </el-form>
</template>

