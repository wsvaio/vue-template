<script lang="ts" name="about" setup>

const isDark = useDark();
const toggleDark = useToggle(isDark);

</script>

<template tag="div">
  <el-button @click="toggleDark()">btn</el-button>
</template>

