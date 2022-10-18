<template>
  <div class="flex flex-wrap h-screen text-center justify-center items-center gap-25px">
    <div class="font-blod desc">
      <div class="text-7xl code">404</div>
      <div ref="content" class="text-3xl content">Not Found</div>
      <button active="scale-90 transform" class="rounded-lg transition btn" @click="$router.push('/')">👉 返回主页</button>
    </div>
    <img src="@/assets/notFound/32.svg" class="cover" alt="page not found" />
  </div>
</template>

<style lang="less" scoped>
.code {
  margin-bottom: 20px;
}

.content {
  height: 40px;
}

.cover {
  margin: 0 5px;
  width: 700px;
  max-width: 100%;
  height: auto;
  max-height: 100%;
}

.desc {
  // flex: 1;
  width: 300px;
}

.btn {
  --tw-shadow-color: 8, 145, 178;
  --tw-shadow:
    0 4px 6px -1px rgba(var(--tw-shadow-color), 0.1),
    0 2px 4px -1px rgba(var(--tw-shadow-color), 0.06);

  margin-top: 30px;
  padding: 12px 20px;
  font-size: 20px;
  box-shadow: 0 0 #0000, 0 0 #0000, 0 0 #0000, var(--tw-shadow);
}
</style>
