import { merge } from "wsvaio";
const storageName = `${import.meta.env.VITE_PROJECT_NAME}_auth`;

export default defineStore("auth", {
  state() {
    const result = { token: "", expire: "" };
    const storageAuth = localStorage.getItem(storageName);
    if (storageAuth) {
      try {
        merge(result, JSON.parse(storageAuth), { has: true });
      } catch (err) {
        localStorage.removeItem(storageName);
        console.error(storageName, err);
      }
    }
    return result;
  },

  actions: {
    async login(body) {
      // const data = await loginAdmin({ body, success: "登陆成功" });
      const data = {};
      merge(this.$state, data, { has: true });
      // 持久化
      body.persist && localStorage.setItem(storageName, JSON.stringify(this.$state));

    },
    logout() {
      localStorage.removeItem(storageName);
      this.$reset();
    },
  },
  getters: {
    isLogin(): boolean {
      return new Date(this.expire) > new Date();
    }
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: storageName,
        storage: sessionStorage,
      }
    ],
  }

});
