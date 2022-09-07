<script setup lang="ts">
import { useRequest } from "vue-request";
import { FormInstance, DrawerProps, FormProps, DialogProps } from "element-plus";
import { merge } from "wsvaio";
const {
  submit: _submit = async () => {},
  form: _form = {},
  drawer: _drawer = {},
  dialog: _dialog = {}
} = defineProps<{
  submit?: (ctx: vtableCtx) => Promise<boolean | void>,
  drawer?: Partial<DrawerProps>,
  dialog?: Partial<DialogProps>,
  form?: Partial<FormProps>,
}>();
const emit = defineEmits<{
  (e: "submited", data: boolean): void
}>();
const ruleFormRef = $ref<FormInstance>();
const formProps = reactive<Read<Partial<FormProps>> & obj>({});
const form = reactive<obj>({});
const drawer = reactive<Read<Partial<DrawerProps>> & obj & { show: boolean, slot: string }>({ show: false, slot: "" });
const drawerProps = computed(() => assignProps(_drawer, drawer));
const dialog = reactive<Read<Partial<DialogProps>> & obj & { show: boolean, slot: string }>({ show: false, slot: "" });
const dialogProps = computed(() => assignProps(_dialog, dialog));
watchEffect(() => {
  dialog.slot ? dialog.show = true : dialog.show = false;
  drawer.slot ? drawer.show = true : drawer.show = false;
});
const { run: submit, loading: submiting } = $(useRequest(async (title = "") => {
  if (drawer.show) await ruleFormRef?.validate();
  if (dialog.show) await ruleFormRef?.validate();
  if (title) drawer.title = dialog.title = title;
  return !!(await _submit(ctx).finally(() => {
    !drawer.slot && (drawer.title = "");
    !dialog.slot && (dialog.title = "");
  }));
}, {
  manual: true,
  onSuccess(data: boolean) {
    if (!data) return;
    drawer.show = dialog.show = false;
    emit("submited", data);
  }
}));
function close() {
  merge(form, {}, { del: true });
  merge(drawer, { show: false, slot: "", ..._drawer });
  merge(dialog, { show: false, slot: "", ..._dialog });
  merge(formProps, _form);
  ruleFormRef?.clearValidate();
}
function assignProps(obj1, obj2) {
  const result: T = { ...obj1, ...obj2 };
  delete result.show;
  delete result.slot;
  return result;
}
const ctx = { drawer, dialog, form, formProps, submit };
defineExpose(ctx);
</script>

<template>
  <el-form ref="ruleFormRef" :model="form" :="{ ..._form, ...formProps }" :disabled="submiting">
    <el-drawer v-model="drawer.show" :="drawerProps" :before-close="done => submiting || done()" @closed="close">
      <div v-loading="submiting">
        <slot :name="drawer.slot" :="ctx" :submiting="submiting"></slot>
      </div>
      <template #footer>
        <slot :name="`${drawer.slot}-footer`" :="ctx" :submiting="submiting">
          <el-button @click="drawer.show = false">取消</el-button>
          <el-button type="primary" @click="submit()">
            <slot :name="`${drawer.slot}-submit-text`" :="ctx" :submiting="submiting">确定</slot>
          </el-button>
        </slot>
      </template>
    </el-drawer>

    <el-dialog v-model="dialog.show" :="dialogProps" :before-close="done => submiting || done()" @closed="close">
      <div v-loading="submiting">
        <slot :name="dialog.slot" :="ctx" :submiting="submiting"></slot>
      </div>
      <template #footer>
        <slot :name="`${dialog.slot}-footer`" :="ctx" :submiting="submiting">
          <el-button @click="dialog.show = false">取消</el-button>
          <el-button type="primary" @click="submit()">
            <slot :name="`${dialog.slot}-submit-text`" :="ctx" :submiting="submiting">确定</slot>
          </el-button>
        </slot>
      </template>
    </el-dialog>

    <slot :="ctx" :submiting="submiting"></slot>
  </el-form>
</template>

