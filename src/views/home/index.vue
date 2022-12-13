<script setup name="home" lang="ts">
const active = ref(true);
const auth = authStore();

runFunctions(
  onMounted,
  onBeforeMount
)(() => {
  tryingSync(
    () => {
      throw new Error("wdf");
    },
    error => {
      console.log(error);
    },
    () => {
      console.log("finally");
    }
  );
  console.log("over");
});
</script>

<template tag="div" class="fu">
  <vpopup transition-name="fade" :duration="100" :active="active" class="myPopup">
    <template #popup>
      <vpopup transition-name="fade" :duration="100">
        321
        <template #popup>
          <vpopup transition-name="fade" :duration="100">
            321
            <template #popup> 456 </template>
          </vpopup>
        </template>
      </vpopup>
    </template>
    <el-button @click="auth.login({})">{{ active }}</el-button>
    123
  </vpopup>
</template>

<style lang="less" scoped>
.vpopup {
  border: 1px solid #000;
}
</style>
