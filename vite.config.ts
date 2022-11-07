/// <reference types="vitest" />
import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";
import plugins from "./presets/plugins";




import pxtorem from "postcss-pxtorem";
// import postcssPresetEnv from "postcss-preset-env";

export default defineConfig(({ mode, command }) => {

  const { VITE_BASE_API, VITE_BASE } = loadEnv(mode, "./");

  return {

    plugins,
    base: VITE_BASE,

    resolve: {
      alias: {
        "@/": `${resolve(__dirname, "src")}/`
      }
    },

    // css: {
    //   postcss: {
    //     plugins: [
    //       pxtorem({
    //         rootValue: 100,
    //         propList: ["*"],
    //         // exclude: /(node_modules)/i
    //       })
    //     ]
    //   }
    // },

    server: {
      proxy: {
        "/api": {
          target: VITE_BASE_API,
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, "")
        }

      }

    },



    test: {

    }

  };

});

