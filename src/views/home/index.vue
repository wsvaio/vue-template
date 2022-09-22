<script lang="ts" name="home" setup>
// import { showToast } from "vant";

import { merge } from "wsvaio";

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
const action = async ({ }: vpopupCtx) => {

};

</script>

<template tag="div">
  home
  <!-- <input :style="{}"> -->
  <van-button @click="$router.push({name: 'about'})"></van-button>
  <van-button @click="cccc">w</van-button>

  <vtable :data="[
    {id: 1, name:'ws', age: 198},
    {id: 2, name: 'sw', age: 12},
    {id: 3, name: 'sw', age: 12},
    {id: 4, name: 'sw', age: 12},
    {id: 5, name: 'sw', age: 12},
  ]">
    <vtable-column label="ID" prop="id" sticky></vtable-column>
    <vtable-column label="NAME" prop="name" :class="['wdf']" #="{ row }">
      {{ row.name }}
    </vtable-column>
    <vtable-column label="AGE" prop="age"></vtable-column>
    <vtable-column label="SETTING" #="{row}">
      <van-button size="mini" @click="vpopupRef!.popup!.slot='p'">修改</van-button>
    </vtable-column>
  </vtable>

  <vpopup ref="vpopupRef" :action="action">
    <template #p="{ popup, form }: vpopupCtx">
      {{ merge(popup, {
        'position': 'bottom',
        'closeable': true,

      }, {rtn: false}) }}
      <div h="100vh">
        {{ form }}
        <van-button @click="vpopupRef!.popup!.slot='b'">fff</van-button>
      </div>
    </template>

    <template #b="{ popup, form }: vpopupCtx">
      {{ merge(popup, {
        'position': 'bottom'
      }, {rtn: false}) }}
      <!-- <div>
        <van-date-picker v-model="form.date" title="选择日期" @confirm="vpopupRef!.popup!.slot='p'" />
      </div> -->
      <van-picker-group title="预约日期" :tabs="['选择日期', '选择时间']" @confirm="popup.slot = 'p'"
        @cancel="popup.show = false">
        <van-date-picker v-model="form.date" />
        <van-time-picker v-model="form.time" />
      </van-picker-group>
    </template>
  </vpopup>
</template>

<style lang="less">
.vtable {
  // .row-1.col-0 {
  //   background-color: red;
  //   grid-row: span 2;
  // }
  // .row-2.col-0 {
  //   display: none;
  // }
  background: black;
  border: 1px solid #000;

  .row-even {
    background: #ccc;
  }


}
</style>
