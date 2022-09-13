import { defineStore } from "pinia";
import { RouteLocationNormalized } from "vue-router";


export default defineStore("main", {
  state() {
    return {
      // 要缓存的路由 因为要支持tab拖动 所以是个一列表
      nameList: new Set(["vrouter"]),
      // 缓存滚动条
      scrollTopCache: new Map<any, number>(),
    };
  },
  actions: {





  },
  getters: {


  }
});