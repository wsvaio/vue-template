export default defineStore("main", {
  state() {
    return {
      // 要缓存的路由
      nameList: new Set(["vrouter"]),
      // 缓存滚动条
      scrollTopCache: new Map<any, number>(),
    };
  },
  actions: {},
  getters: {},
});
