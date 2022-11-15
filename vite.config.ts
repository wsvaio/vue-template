/// <reference types="vitest" />
import vue from "@vitejs/plugin-vue";
import { defineConfig, loadEnv } from "vite";
import { resolve } from "path";

import Inspect from "vite-plugin-inspect";

import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver, VantResolver, NaiveUiResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";

import VueSetupExtend from "vite-plugin-vue-setup-extend";

import Unocss from "unocss/vite";
import { presetUno, presetAttributify, transformerDirectives } from "unocss";

import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";


import sfcExtendTag from "vite-plugin-vue-sfcextendtag";


// import legacy from "@vitejs/plugin-legacy";

// import { VitePWA } from "vite-plugin-pwa";
// import Markdown from "vite-plugin-md";
// import { viteMockServe } from "vite-plugin-mock";



// import pxtorem from "postcss-pxtorem";
// import postcssPresetEnv from "postcss-preset-env";

export default defineConfig(({ mode, command }) => {

  const { VITE_BASE_API, VITE_BASE } = loadEnv(mode, "./");

  return {


    base: VITE_BASE,

    resolve: {
      alias: {
        "@/": `${resolve(__dirname, "src")}/`
      }
    },

    css: {
      postcss: {
        plugins: [
          // pxtorem({
          //   rootValue: 100,
          //   propList: ["*"],
          // }),
          // postcssPresetEnv(),
        ]
      }
    },

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



    },

    plugins: [

      // 检查根<template>是否有tag属性 如果有则在原来的基础上添加这个tag标签包裹
      sfcExtendTag(),

      vue({
        // include: [/\.vue$/, /\.md$/],
        // 开启 vue $() 语法糖
        reactivityTransform: true

      }),

      // legacy({
      //   // targets: ["defaults", "not IE 11"]
      //   // targets: ["defaults", "not IE 11"]
      // }),


      // VitePWA({}),

      // 支持md文件解析为vue组件
      // Markdown(),

      // // setup 添加 name 属性
      VueSetupExtend(),

      // 点击页面元素,自动打开本地IDE并跳转到对应的Vue组件
      // Inspector({ enabled: false }),

      // mock 数据
      // viteMockServe(),

      // unocss 原子化css
      Unocss({
        presets: [
          // 基础预设
          presetUno(),
          // presetWind(),
          // 属性化模式支持
          presetAttributify({
            // 设置前缀
            prefix: "un:",
            // 前缀不是必须的
            prefixedOnly: false

          })
        ],

        transformers: [
          // @apply 指令
          transformerDirectives({
            enforce: "pre"
          })
        ]
      }),

      // Inspect 调试支持 依赖图谱
      Inspect(),

      // api 自动引入
      AutoImport({
        dts: resolve(__dirname, "typing/auto-import.d.ts"),
        imports: ["vue", "vue-router", "pinia", "@vueuse/core", "vitest"],
        resolvers: [
          ElementPlusResolver(),
          VantResolver(),
          NaiveUiResolver(),
        ],
        dirs: [
          "src/apis",
          "src/utils",
          "src/composables",
          "src/stores"
        ],
      }),

      // 组件自动引入
      Components({
        dts: resolve(__dirname, "typing/auto-components.d.ts"),
        resolvers: [
          ElementPlusResolver(),
          VantResolver(),
          NaiveUiResolver(),
          IconsResolver(),
        ],
        dirs: [
          "src/components",
        ]

      }),
      // iconify
      Icons({})
    ],

  };

});

