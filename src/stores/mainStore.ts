import { defineStore } from "pinia";
import { RouteLocationNormalized } from "vue-router";
const storageName = `${import.meta.env.VITE_PROJECT_NAME}_main`;

export default defineStore("main", {
  state: () => ({
    // 要缓存的路由 因为要支持tab拖动 所以是个一列表
    keepAlive: [] as RouteLocationNormalized[],
    setting: {
      layout: "left",
      collapse: false,
    }

  }),
  actions: {
    addKeepAlive(route: RouteLocationNormalized) {
      const children = route.matched.find(item => item.name == route.name)?.children || [];
      if (this.keepAlive.find(item => item.name == route.name) // 已存在
        || route.matched[0].name != "admin" // 不是admin子路由
        || children.length > 0
      ) return;


      this.keepAlive.push(route);
    }


  },
  getters: {
    // 要缓存的路由名
    nameList(): string[] {
      return ["vrouter", "admin", ...this.keepAlive.map(item => String(item.name))];
    },
    asideWidth() {
      const { layout, collapse } = this.setting;
      if (layout == "left") {
        return collapse ? "64px" : "200px";
      }
      else if (layout == "mobile") {
        return collapse ? "0px" : "200px";
      }
      else return "200px";
    }

  },

  persist: {
    enabled: true,
    strategies: [
      {
        key: storageName,
        paths: ["setting"],
        storage: sessionStorage,
      }
    ],
  }
});