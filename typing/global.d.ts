import { App as app, ComponentOptions } from "vue";

declare module "vue" {
  export interface GlobalComponents {
    // component: ComponentOptions;
  }
}

declare module "vue-router" {
  interface RouteMeta {
    title?: string;
    icon?: ComponentOptions;
  }
  interface RouteLocationNormalized {
    name: string;
  }
}

declare global {

  interface ImportMetaEnv {
    readonly VITE_PROJECT_NAME: string;
    readonly VITE_DOCUMENT_TITLE: string;
    readonly VITE_BASE: string;
    readonly VITE_BASE_API: string;
  }


  type T = any;
  type obj = { [k: string]: any; };
  type keys<K extends keyof any, T = any> = {
    [P in K]: T;
  } & obj;


  type Read<T> = {
    -readonly [K in keyof T]: T[K]
  };

  type App = app;
}

export { };
