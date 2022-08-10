import { defineStore } from "pinia";

const storageName = `${import.meta.env.VITE_PROJECT_NAME}_auth`;



export default defineStore("auth", {
  state() {
    return {

    };

  },

  actions: {

  },
  getters: {

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