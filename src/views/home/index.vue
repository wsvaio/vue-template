<script lang="ts" name="home" setup>
// import { showToast } from "vant";

import { merge } from "@wsvaio/utils";

console.log("wdf");
const cccc = async () => {
  // showToast("wdf");
  // VanToast("wdf");
  // VanToast("wdf");
  // VanToast.
  // showToast({"type": "html", "message": "wdf"});
  showToast("wef");
};

const vpopupRef = $ref<vpopupCtx>();
const action = async ({ popup, payload, act, form }: vpopupCtx) => {
  console.log(Object.keys(payload), JSON.stringify(payload));
  const name = payload.$name;
  if (name == "修改") {
    payload.$slot = "p";
    popup.position = "bottom";
  }
};
</script>

<template tag="div">
  home
  <!-- <input :style="{}"> -->
  <van-button @click="$router.push({ name: 'about' })"></van-button>
  <van-button @click="cccc">w</van-button>

  <vtable
    :data="[
      { id: 1, name: 'ws', age: 198 },
      { id: 2, name: 'sw', age: 12 },
      { id: 3, name: 'sw', age: 12 },
      { id: 4, name: 'sw', age: 12 },
      { id: 5, name: 'sw', age: 12 },
    ]"
  >
    <vtable-column label="ID" prop="id" sticky></vtable-column>
    <vtable-column label="NAME" prop="name" :class="['wdf']" #="{ row }">
      {{ row.name }}
    </vtable-column>
    <vtable-column label="AGE" prop="age"></vtable-column>
    <vtable-column label="SETTING" #="{ row }">
      <van-button size="mini" @click="vpopupRef?.act('修改')">修改</van-button>
    </vtable-column>
  </vtable>

  <vpopup ref="vpopupRef" :action="action">
    <template #p="{ popup, form, payload }: vpopupCtx">
      <!-- {{
        merge(popup, {
          position: "bottom",
          closeable: true,
        }) && ""
      }} -->
      <div h="100vh">
        {{ payload }}
        <van-button @click="vpopupRef!.payload.$slot = 'b'">fff</van-button>
      </div>
    </template>

    <template #b="{ popup, payload }: vpopupCtx">
      {{
        merge(popup, {
          position: "bottom",
        }) && ""
      }}
      <!-- <div>
        <van-date-picker v-model="form.date" title="选择日期" @confirm="vpopupRef!.popup!.slot='p'" />
      </div> -->
      <van-picker-group
        title="预约日期"
        :tabs="['选择日期', '选择时间']"
        @confirm="payload.$slot = 'p'"
        @cancel="payload.$show = false"
      >
        <van-date-picker v-model="payload.date" />
        <van-time-picker v-model="payload.time" />
      </van-picker-group>
    </template>
  </vpopup>
</template>

<style lang="less">
.vtable {
  border: 1px solid #000;
  // .row-1.col-0 {
  //   background-color: red;
  //   grid-row: span 2;
  // }
  // .row-2.col-0 {
  //   display: none;
  // }
  background: black;

  .row-even {
    background: #ccc;
  }
}
</style>
