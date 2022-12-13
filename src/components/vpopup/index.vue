<script setup lang="ts">
import { useRequest } from "vue-request";
import { merge } from "@wsvaio/utils";

const {
  action,
  popup: popupProps = {},
  form: formProps = {},
} = defineProps<{
  action: (ctx: vpopupCtx) => Promise<any>;
  popup?: vpopupCtx["popup"];
  form?: vpopupCtx["form"];
}>();

const vanFormRef = $ref<vpopupCtx["vanFormRef"]>();
const form = reactive<vpopupCtx["form"]>({});
const popup = reactive<vpopupCtx["popup"]>({});
const payload = reactive<vpopupCtx["payload"]>({
  $show: false,
  $name: "",
  $slot: "",
});
Object.defineProperties(payload, {
  $show: { enumerable: false },
  $name: { enumerable: false },
  $slot: { enumerable: false },
});

const { loading, runAsync } = $(
  useRequest(
    async (options?: string | vpopupCtx["payload"]) => {
      if (typeof options == "object") merge(payload, options);
      else if (typeof options == "string") payload.$name = options;
      return await action(ctx);
    },
    {
      manual: true,
      onSuccess: data => data && (payload.$show ? (payload.$show = false) : close()),
    }
  )
);

watchEffect(() => (payload.$show = !!payload.$slot));

const close = () => {
  merge(form, {}, { del: true });
  merge(popup, {}, { del: true });
  merge(payload, { $show: false, $name: "", $slot: "" }, { del: true });
  vanFormRef?.resetValidation();
};

const ctx = reactive({ form, formProps, popup, vanFormRef, act: runAsync, payload });
onMounted(() => vanFormRef && (ctx.vanFormRef = vanFormRef));
defineExpose(ctx);
</script>

<template>
  <van-form ref="vanFormRef" :="{ ...formProps, ...form }">
    <slot :="ctx"></slot>
    <van-popup
      v-model:show="payload.$show"
      :="{ ...popupProps, ...popup }"
      close-on-click-overlay
      :before-close="() => !loading"
      @closed="close"
    >
      <slot :name="payload.$slot" :="ctx"></slot>
    </van-popup>
  </van-form>
</template>

<!-- <style lang="less" scoped></style> -->
