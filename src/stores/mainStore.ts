import { defineStore } from "pinia";
import { RouteLocationNormalized } from "vue-router";


export default defineStore("main", {
  state() {
    return {
      // 要缓存的路由 因为要支持tab拖动 所以是个一列表
      keepAlive: [] as RouteLocationNormalized[],

    };
  },
  actions: {
    addKeepAlive(route: RouteLocationNormalized) {

      if (this.keepAlive.find(item => item.name == route.name) // 已存在
        || route.matched[0].name != "default" // 不是default子路由
        || (route.matched[1].name != route.name && route.matched[2]?.name != route.name) // 不是default的一级或二级子路由
      ) return;

      this.keepAlive.push(route);
    }


  },
  getters: {
    // 要缓存的路由名
    nameList(): string[] {
      return ["keep-alive", ...this.keepAlive.map(item => String(item.name))];
    }

  }
});