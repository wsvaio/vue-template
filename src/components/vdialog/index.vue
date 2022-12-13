<script setup lang="ts">
import { useRequest } from "vue-request";
import { FormInstance } from "element-plus";
import { merge, omit } from "@wsvaio/utils";
const {
  action,
  form: formProps = {},
  dialog: dialogProps = {},
} = defineProps<{
  action: (ctx: vdialogCtx) => Promise<any>;
  dialog?: vdialogCtx["dialog"];
  form?: vdialogCtx["form"];
}>();

const elFormRef = $ref<FormInstance>();
const form = reactive<vdialogCtx["form"]>({});
const dialog = reactive<vdialogCtx["dialog"]>({ show: false, slot: "" });
const payload = reactive<vdialogCtx["payload"]>({});

const { runAsync, loading } = $(
  useRequest(
    async (options?: string | vdialogCtx["payload"]) => {
      if (typeof options == "object") {
        merge(payload, options);
      } else if (typeof options == "string") {
        payload.name = options;
      }
      return await action(ctx);
    },
    {
      manual: true,
      onSuccess: data => data && (dialog.show ? (dialog.show = false) : close()),
    }
  )
);
watchEffect(() => (dialog.show = !!dialog.slot));

const close = () => {
  merge(form, {}, { del: true });
  merge(dialog, { show: false, slot: "" }, { del: true });
  merge(payload, {}, { del: true });
  elFormRef?.clearValidate();
};

const ctx = reactive({ dialog, form, action: runAsync, payload, loading });
onMounted(() => elFormRef && (ctx.elFormRef = elFormRef));
defineExpose(ctx);
</script>

<template>
  <el-form
    ref="elFormRef"
    label-position="top"
    :model="form"
    :="{ ...formProps, ...form }"
    :disabled="loading"
  >
    <el-dialog
      v-model="dialog.show"
      :="omit({ ...dialogProps, ...dialog }, ['slot', 'show'])"
      :before-close="done => loading || done()"
      @closed="close"
    >
      <div v-loading="loading" min="h-full">
        <slot :name="dialog.slot" :="ctx"></slot>
      </div>
      <template #footer>
        <slot :name="`${dialog.slot}-footer`" :="ctx">
          <el-button @click="dialog.show = false">取消</el-button>
          <el-button type="primary" @click="runAsync()">
            <slot :name="`${dialog.slot}-submit-text`" :="ctx">确定</slot>
          </el-button>
        </slot>
      </template>
    </el-dialog>
    <slot :="ctx"></slot>
  </el-form>
</template>
