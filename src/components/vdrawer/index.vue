<script setup lang="ts">
import { useRequest } from "vue-request";
import { FormInstance } from "element-plus";
import { merge, omit } from "@wsvaio/utils";
const {
  action,
  form: _form = {},
  drawer: _drawer = {},
} = defineProps<{
  action: (ctx: vdrawerCtx) => Promise<any>;
  drawer?: vdrawerCtx["drawer"];
  form?: vdrawerCtx["form"];
}>();

const elFormRef = $ref<FormInstance>();
const form = reactive<vdrawerCtx["form"]>({});
const drawer = reactive<vdrawerCtx["drawer"]>({ show: false, slot: "" });
const payload = reactive<vdrawerCtx["payload"]>({});

const { runAsync, loading } = $(
  useRequest(
    async (options?: string | vdrawerCtx["payload"]) => {
      if (typeof options == "object") {
        merge(payload, options);
      } else if (typeof options == "string") {
        payload.name = options;
      }
      return await action(ctx);
    },
    {
      manual: true,
      onSuccess: data => data && (drawer.show ? (drawer.show = false) : close()),
    }
  )
);
watchEffect(() => (drawer.show = !!drawer.slot));

const close = () => {
  merge(form, {}, { del: true });
  merge(drawer, { show: false, slot: "" }, { del: true });
  merge(payload, {}, { del: true });
  elFormRef?.clearValidate();
};

const ctx = reactive({ drawer, form, action: runAsync, payload, loading });
onMounted(() => elFormRef && (ctx.elFormRef = elFormRef));
defineExpose(ctx);
</script>

<template>
  <el-form
    ref="elFormRef"
    label-position="top"
    :model="form"
    :="{ ..._form, ...form }"
    :disabled="loading"
  >
    <el-drawer
      v-model="drawer.show"
      :="omit({ ..._drawer, ...drawer }, ['slot', 'show'])"
      :before-close="done => loading || done()"
      @closed="close"
    >
      <div v-loading="loading" min="h-full">
        <slot :name="drawer.slot" :="ctx"></slot>
      </div>
      <template #footer>
        <slot :name="`${drawer.slot}-footer`" :="ctx">
          <el-button @click="drawer.show = false">取消</el-button>
          <el-button type="primary" @click="runAsync()">
            <slot :name="`${drawer.slot}-submit-text`" :="ctx">确定</slot>
          </el-button>
        </slot>
      </template>
    </el-drawer>
    <slot :="ctx"></slot>
  </el-form>
</template>
