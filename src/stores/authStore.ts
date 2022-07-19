import { defineStore } from "pinia";

const storageName = `${import.meta.env.VITE_PROJECT_NAME}_token`;



export default defineStore("token", {
  state() {
    return {

    }

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