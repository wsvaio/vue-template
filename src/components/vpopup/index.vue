<script setup lang='ts'>
import { PopupProps, FormInstance, FormProps } from "vant";
import { useRequest } from "vue-request";
import { merge, omit } from "wsvaio";

const {
  action: act,
  popup: _popup = {},
  formProps: _formProps = {},
} = defineProps<{
  action: (ctx: vpopupCtx) => Promise<T>,
  popup?: vpopupCtx["popup"],
  formProps?: vpopupCtx["formProps"],
}>();


const emit = defineEmits(["success"]);

const { data, loading, runAsync: action, run } = $(useRequest(async (name = "") => {
  await vanFormRef.validate();
  if (name) popup.name = name;
  return await act(ctx);
}, {
  manual: true,
  onSuccess(data) {
    if (!data) return;
    popup.slot = "";
    emit("success");
  }
}));

const vanFormRef = $ref<FormInstance>();
const form = reactive<obj>({});
const formProps = reactive<vpopupCtx["formProps"]>({});
const popup = reactive<vpopupCtx["popup"]>({
  show: false,
  slot: "",
  name: "",
});


watchEffect(() => {
  popup.show = !!popup.slot;
});

const closedHandler = () => {
  merge(form, {}, { del: true });
  merge(popup, { show: false, slot: "" }, { del: true });
  merge(formProps, _formProps, { del: true });
  vanFormRef.resetValidation();
};

const ctx = { form, formProps, popup, vanFormRef, action };
defineExpose(ctx);
</script>

<template>
  <van-form ref="vanFormRef" :="{..._formProps, ...formProps}">
    <slot :="ctx" :loading="loading"></slot>
    <van-popup v-model:show="popup.show" :="omit({..._popup, ...popup}, 'show', 'slot')"
      close-on-click-overlay :before-close="() => !loading" @closed="closedHandler">
      <slot :name="popupProps.slot" :="ctx" :loading="loading"></slot>
    </van-popup>
  </van-form>
</template>

<style lang='less' scoped>

</style>